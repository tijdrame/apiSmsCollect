import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITracking } from '../tracking.model';
import { TrackingService } from '../service/tracking.service';

@Component({
  templateUrl: './tracking-delete-dialog.component.html',
})
export class TrackingDeleteDialogComponent {
  tracking?: ITracking;

  constructor(protected trackingService: TrackingService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.trackingService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
