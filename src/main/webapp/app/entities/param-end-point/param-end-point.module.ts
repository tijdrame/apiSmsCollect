import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { ParamEndPointComponent } from './list/param-end-point.component';
import { ParamEndPointDetailComponent } from './detail/param-end-point-detail.component';
import { ParamEndPointUpdateComponent } from './update/param-end-point-update.component';
import { ParamEndPointDeleteDialogComponent } from './delete/param-end-point-delete-dialog.component';
import { ParamEndPointRoutingModule } from './route/param-end-point-routing.module';

@NgModule({
  imports: [SharedModule, ParamEndPointRoutingModule],
  declarations: [ParamEndPointComponent, ParamEndPointDetailComponent, ParamEndPointUpdateComponent, ParamEndPointDeleteDialogComponent],
  entryComponents: [ParamEndPointDeleteDialogComponent],
})
export class ParamEndPointModule {}
