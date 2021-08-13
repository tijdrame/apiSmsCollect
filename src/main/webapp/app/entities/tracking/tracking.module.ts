import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { TrackingComponent } from './list/tracking.component';
import { TrackingDetailComponent } from './detail/tracking-detail.component';
import { TrackingUpdateComponent } from './update/tracking-update.component';
import { TrackingDeleteDialogComponent } from './delete/tracking-delete-dialog.component';
import { TrackingRoutingModule } from './route/tracking-routing.module';

@NgModule({
  imports: [SharedModule, TrackingRoutingModule],
  declarations: [TrackingComponent, TrackingDetailComponent, TrackingUpdateComponent, TrackingDeleteDialogComponent],
  entryComponents: [TrackingDeleteDialogComponent],
})
export class TrackingModule {}
