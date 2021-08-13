import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IParamEndPoint } from '../param-end-point.model';
import { ParamEndPointService } from '../service/param-end-point.service';
import { ParamEndPointDeleteDialogComponent } from '../delete/param-end-point-delete-dialog.component';

@Component({
  selector: 'jhi-param-end-point',
  templateUrl: './param-end-point.component.html',
})
export class ParamEndPointComponent implements OnInit {
  paramEndPoints?: IParamEndPoint[];
  isLoading = false;

  constructor(protected paramEndPointService: ParamEndPointService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.paramEndPointService.query().subscribe(
      (res: HttpResponse<IParamEndPoint[]>) => {
        this.isLoading = false;
        this.paramEndPoints = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IParamEndPoint): number {
    return item.id!;
  }

  delete(paramEndPoint: IParamEndPoint): void {
    const modalRef = this.modalService.open(ParamEndPointDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.paramEndPoint = paramEndPoint;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
