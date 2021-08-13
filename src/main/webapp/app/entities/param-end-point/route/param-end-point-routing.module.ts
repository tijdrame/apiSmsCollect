import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ParamEndPointComponent } from '../list/param-end-point.component';
import { ParamEndPointDetailComponent } from '../detail/param-end-point-detail.component';
import { ParamEndPointUpdateComponent } from '../update/param-end-point-update.component';
import { ParamEndPointRoutingResolveService } from './param-end-point-routing-resolve.service';

const paramEndPointRoute: Routes = [
  {
    path: '',
    component: ParamEndPointComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ParamEndPointDetailComponent,
    resolve: {
      paramEndPoint: ParamEndPointRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ParamEndPointUpdateComponent,
    resolve: {
      paramEndPoint: ParamEndPointRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ParamEndPointUpdateComponent,
    resolve: {
      paramEndPoint: ParamEndPointRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(paramEndPointRoute)],
  exports: [RouterModule],
})
export class ParamEndPointRoutingModule {}
