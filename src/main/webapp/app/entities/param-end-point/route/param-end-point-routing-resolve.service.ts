import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IParamEndPoint, ParamEndPoint } from '../param-end-point.model';
import { ParamEndPointService } from '../service/param-end-point.service';

@Injectable({ providedIn: 'root' })
export class ParamEndPointRoutingResolveService implements Resolve<IParamEndPoint> {
  constructor(protected service: ParamEndPointService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IParamEndPoint> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((paramEndPoint: HttpResponse<ParamEndPoint>) => {
          if (paramEndPoint.body) {
            return of(paramEndPoint.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ParamEndPoint());
  }
}
