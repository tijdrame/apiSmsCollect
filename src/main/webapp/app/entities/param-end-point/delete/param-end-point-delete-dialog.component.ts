import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IParamEndPoint } from '../param-end-point.model';
import { ParamEndPointService } from '../service/param-end-point.service';

@Component({
  templateUrl: './param-end-point-delete-dialog.component.html',
})
export class ParamEndPointDeleteDialogComponent {
  paramEndPoint?: IParamEndPoint;

  constructor(protected paramEndPointService: ParamEndPointService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.paramEndPointService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
