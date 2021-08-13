import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'tracking',
        data: { pageTitle: 'apiSmsCollectApp.tracking.home.title' },
        loadChildren: () => import('./tracking/tracking.module').then(m => m.TrackingModule),
      },
      {
        path: 'param-end-point',
        data: { pageTitle: 'apiSmsCollectApp.paramEndPoint.home.title' },
        loadChildren: () => import('./param-end-point/param-end-point.module').then(m => m.ParamEndPointModule),
      },
      {
        path: 'param-general',
        data: { pageTitle: 'apiSmsCollectApp.paramGeneral.home.title' },
        loadChildren: () => import('./param-general/param-general.module').then(m => m.ParamGeneralModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
