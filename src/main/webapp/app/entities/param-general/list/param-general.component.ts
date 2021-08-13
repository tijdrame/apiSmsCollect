import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IParamGeneral } from '../param-general.model';
import { ParamGeneralService } from '../service/param-general.service';
import { ParamGeneralDeleteDialogComponent } from '../delete/param-general-delete-dialog.component';

@Component({
  selector: 'jhi-param-general',
  templateUrl: './param-general.component.html',
})
export class ParamGeneralComponent implements OnInit {
  paramGenerals?: IParamGeneral[];
  isLoading = false;

  constructor(protected paramGeneralService: ParamGeneralService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.paramGeneralService.query().subscribe(
      (res: HttpResponse<IParamGeneral[]>) => {
        this.isLoading = false;
        this.paramGenerals = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IParamGeneral): number {
    return item.id!;
  }

  delete(paramGeneral: IParamGeneral): void {
    const modalRef = this.modalService.open(ParamGeneralDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.paramGeneral = paramGeneral;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
