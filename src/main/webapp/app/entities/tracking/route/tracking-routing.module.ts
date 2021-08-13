import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TrackingComponent } from '../list/tracking.component';
import { TrackingDetailComponent } from '../detail/tracking-detail.component';
import { TrackingUpdateComponent } from '../update/tracking-update.component';
import { TrackingRoutingResolveService } from './tracking-routing-resolve.service';

const trackingRoute: Routes = [
  {
    path: '',
    component: TrackingComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TrackingDetailComponent,
    resolve: {
      tracking: TrackingRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TrackingUpdateComponent,
    resolve: {
      tracking: TrackingRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TrackingUpdateComponent,
    resolve: {
      tracking: TrackingRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(trackingRoute)],
  exports: [RouterModule],
})
export class TrackingRoutingModule {}
