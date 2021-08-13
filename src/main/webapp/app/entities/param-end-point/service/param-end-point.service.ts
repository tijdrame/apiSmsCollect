import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IParamEndPoint, getParamEndPointIdentifier } from '../param-end-point.model';

export type EntityResponseType = HttpResponse<IParamEndPoint>;
export type EntityArrayResponseType = HttpResponse<IParamEndPoint[]>;

@Injectable({ providedIn: 'root' })
export class ParamEndPointService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/param-end-points');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(paramEndPoint: IParamEndPoint): Observable<EntityResponseType> {
    return this.http.post<IParamEndPoint>(this.resourceUrl, paramEndPoint, { observe: 'response' });
  }

  update(paramEndPoint: IParamEndPoint): Observable<EntityResponseType> {
    return this.http.put<IParamEndPoint>(`${this.resourceUrl}/${getParamEndPointIdentifier(paramEndPoint) as number}`, paramEndPoint, {
      observe: 'response',
    });
  }

  partialUpdate(paramEndPoint: IParamEndPoint): Observable<EntityResponseType> {
    return this.http.patch<IParamEndPoint>(`${this.resourceUrl}/${getParamEndPointIdentifier(paramEndPoint) as number}`, paramEndPoint, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IParamEndPoint>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IParamEndPoint[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addParamEndPointToCollectionIfMissing(
    paramEndPointCollection: IParamEndPoint[],
    ...paramEndPointsToCheck: (IParamEndPoint | null | undefined)[]
  ): IParamEndPoint[] {
    const paramEndPoints: IParamEndPoint[] = paramEndPointsToCheck.filter(isPresent);
    if (paramEndPoints.length > 0) {
      const paramEndPointCollectionIdentifiers = paramEndPointCollection.map(
        paramEndPointItem => getParamEndPointIdentifier(paramEndPointItem)!
      );
      const paramEndPointsToAdd = paramEndPoints.filter(paramEndPointItem => {
        const paramEndPointIdentifier = getParamEndPointIdentifier(paramEndPointItem);
        if (paramEndPointIdentifier == null || paramEndPointCollectionIdentifiers.includes(paramEndPointIdentifier)) {
          return false;
        }
        paramEndPointCollectionIdentifiers.push(paramEndPointIdentifier);
        return true;
      });
      return [...paramEndPointsToAdd, ...paramEndPointCollection];
    }
    return paramEndPointCollection;
  }
}
