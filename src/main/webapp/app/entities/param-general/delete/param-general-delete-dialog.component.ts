import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IParamGeneral } from '../param-general.model';
import { ParamGeneralService } from '../service/param-general.service';

@Component({
  templateUrl: './param-general-delete-dialog.component.html',
})
export class ParamGeneralDeleteDialogComponent {
  paramGeneral?: IParamGeneral;

  constructor(protected paramGeneralService: ParamGeneralService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.paramGeneralService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
