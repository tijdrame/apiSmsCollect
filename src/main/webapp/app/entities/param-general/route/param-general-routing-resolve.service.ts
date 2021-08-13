import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IParamGeneral, ParamGeneral } from '../param-general.model';
import { ParamGeneralService } from '../service/param-general.service';

@Injectable({ providedIn: 'root' })
export class ParamGeneralRoutingResolveService implements Resolve<IParamGeneral> {
  constructor(protected service: ParamGeneralService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IParamGeneral> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((paramGeneral: HttpResponse<ParamGeneral>) => {
          if (paramGeneral.body) {
            return of(paramGeneral.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ParamGeneral());
  }
}
