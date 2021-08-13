import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITracking, Tracking } from '../tracking.model';
import { TrackingService } from '../service/tracking.service';

@Injectable({ providedIn: 'root' })
export class TrackingRoutingResolveService implements Resolve<ITracking> {
  constructor(protected service: TrackingService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITracking> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((tracking: HttpResponse<Tracking>) => {
          if (tracking.body) {
            return of(tracking.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Tracking());
  }
}
