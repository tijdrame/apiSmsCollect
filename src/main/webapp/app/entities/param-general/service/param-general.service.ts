import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IParamGeneral, getParamGeneralIdentifier } from '../param-general.model';

export type EntityResponseType = HttpResponse<IParamGeneral>;
export type EntityArrayResponseType = HttpResponse<IParamGeneral[]>;

@Injectable({ providedIn: 'root' })
export class ParamGeneralService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/param-generals');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(paramGeneral: IParamGeneral): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(paramGeneral);
    return this.http
      .post<IParamGeneral>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(paramGeneral: IParamGeneral): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(paramGeneral);
    return this.http
      .put<IParamGeneral>(`${this.resourceUrl}/${getParamGeneralIdentifier(paramGeneral) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(paramGeneral: IParamGeneral): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(paramGeneral);
    return this.http
      .patch<IParamGeneral>(`${this.resourceUrl}/${getParamGeneralIdentifier(paramGeneral) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IParamGeneral>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IParamGeneral[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addParamGeneralToCollectionIfMissing(
    paramGeneralCollection: IParamGeneral[],
    ...paramGeneralsToCheck: (IParamGeneral | null | undefined)[]
  ): IParamGeneral[] {
    const paramGenerals: IParamGeneral[] = paramGeneralsToCheck.filter(isPresent);
    if (paramGenerals.length > 0) {
      const paramGeneralCollectionIdentifiers = paramGeneralCollection.map(
        paramGeneralItem => getParamGeneralIdentifier(paramGeneralItem)!
      );
      const paramGeneralsToAdd = paramGenerals.filter(paramGeneralItem => {
        const paramGeneralIdentifier = getParamGeneralIdentifier(paramGeneralItem);
        if (paramGeneralIdentifier == null || paramGeneralCollectionIdentifiers.includes(paramGeneralIdentifier)) {
          return false;
        }
        paramGeneralCollectionIdentifiers.push(paramGeneralIdentifier);
        return true;
      });
      return [...paramGeneralsToAdd, ...paramGeneralCollection];
    }
    return paramGeneralCollection;
  }

  protected convertDateFromClient(paramGeneral: IParamGeneral): IParamGeneral {
    return Object.assign({}, paramGeneral, {
      varInstant: paramGeneral.varInstant?.isValid() ? paramGeneral.varInstant.toJSON() : undefined,
      varDate: paramGeneral.varDate?.isValid() ? paramGeneral.varDate.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.varInstant = res.body.varInstant ? dayjs(res.body.varInstant) : undefined;
      res.body.varDate = res.body.varDate ? dayjs(res.body.varDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((paramGeneral: IParamGeneral) => {
        paramGeneral.varInstant = paramGeneral.varInstant ? dayjs(paramGeneral.varInstant) : undefined;
        paramGeneral.varDate = paramGeneral.varDate ? dayjs(paramGeneral.varDate) : undefined;
      });
    }
    return res;
  }
}
