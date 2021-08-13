import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ParamGeneralComponent } from '../list/param-general.component';
import { ParamGeneralDetailComponent } from '../detail/param-general-detail.component';
import { ParamGeneralUpdateComponent } from '../update/param-general-update.component';
import { ParamGeneralRoutingResolveService } from './param-general-routing-resolve.service';

const paramGeneralRoute: Routes = [
  {
    path: '',
    component: ParamGeneralComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ParamGeneralDetailComponent,
    resolve: {
      paramGeneral: ParamGeneralRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ParamGeneralUpdateComponent,
    resolve: {
      paramGeneral: ParamGeneralRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ParamGeneralUpdateComponent,
    resolve: {
      paramGeneral: ParamGeneralRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(paramGeneralRoute)],
  exports: [RouterModule],
})
export class ParamGeneralRoutingModule {}
