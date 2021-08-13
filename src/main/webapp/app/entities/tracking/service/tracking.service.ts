import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITracking, getTrackingIdentifier } from '../tracking.model';

export type EntityResponseType = HttpResponse<ITracking>;
export type EntityArrayResponseType = HttpResponse<ITracking[]>;

@Injectable({ providedIn: 'root' })
export class TrackingService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/trackings');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(tracking: ITracking): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(tracking);
    return this.http
      .post<ITracking>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(tracking: ITracking): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(tracking);
    return this.http
      .put<ITracking>(`${this.resourceUrl}/${getTrackingIdentifier(tracking) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(tracking: ITracking): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(tracking);
    return this.http
      .patch<ITracking>(`${this.resourceUrl}/${getTrackingIdentifier(tracking) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITracking>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITracking[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addTrackingToCollectionIfMissing(trackingCollection: ITracking[], ...trackingsToCheck: (ITracking | null | undefined)[]): ITracking[] {
    const trackings: ITracking[] = trackingsToCheck.filter(isPresent);
    if (trackings.length > 0) {
      const trackingCollectionIdentifiers = trackingCollection.map(trackingItem => getTrackingIdentifier(trackingItem)!);
      const trackingsToAdd = trackings.filter(trackingItem => {
        const trackingIdentifier = getTrackingIdentifier(trackingItem);
        if (trackingIdentifier == null || trackingCollectionIdentifiers.includes(trackingIdentifier)) {
          return false;
        }
        trackingCollectionIdentifiers.push(trackingIdentifier);
        return true;
      });
      return [...trackingsToAdd, ...trackingCollection];
    }
    return trackingCollection;
  }

  protected convertDateFromClient(tracking: ITracking): ITracking {
    return Object.assign({}, tracking, {
      dateRequest: tracking.dateRequest?.isValid() ? tracking.dateRequest.toJSON() : undefined,
      dateResponse: tracking.dateResponse?.isValid() ? tracking.dateResponse.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateRequest = res.body.dateRequest ? dayjs(res.body.dateRequest) : undefined;
      res.body.dateResponse = res.body.dateResponse ? dayjs(res.body.dateResponse) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((tracking: ITracking) => {
        tracking.dateRequest = tracking.dateRequest ? dayjs(tracking.dateRequest) : undefined;
        tracking.dateResponse = tracking.dateResponse ? dayjs(tracking.dateResponse) : undefined;
      });
    }
    return res;
  }
}
