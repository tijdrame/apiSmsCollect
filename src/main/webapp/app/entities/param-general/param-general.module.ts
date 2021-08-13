import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { ParamGeneralComponent } from './list/param-general.component';
import { ParamGeneralDetailComponent } from './detail/param-general-detail.component';
import { ParamGeneralUpdateComponent } from './update/param-general-update.component';
import { ParamGeneralDeleteDialogComponent } from './delete/param-general-delete-dialog.component';
import { ParamGeneralRoutingModule } from './route/param-general-routing.module';

@NgModule({
  imports: [SharedModule, ParamGeneralRoutingModule],
  declarations: [ParamGeneralComponent, ParamGeneralDetailComponent, ParamGeneralUpdateComponent, ParamGeneralDeleteDialogComponent],
  entryComponents: [ParamGeneralDeleteDialogComponent],
})
export class ParamGeneralModule {}
