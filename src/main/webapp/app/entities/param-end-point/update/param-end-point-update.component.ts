import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IParamEndPoint, ParamEndPoint } from '../param-end-point.model';
import { ParamEndPointService } from '../service/param-end-point.service';

@Component({
  selector: 'jhi-param-end-point-update',
  templateUrl: './param-end-point-update.component.html',
})
export class ParamEndPointUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    codeParam: [],
    endPoints: [],
    attribute01: [],
    attribute02: [],
    attribute03: [],
    attribute04: [],
  });

  constructor(protected paramEndPointService: ParamEndPointService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ paramEndPoint }) => {
      this.updateForm(paramEndPoint);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const paramEndPoint = this.createFromForm();
    if (paramEndPoint.id !== undefined) {
      this.subscribeToSaveResponse(this.paramEndPointService.update(paramEndPoint));
    } else {
      this.subscribeToSaveResponse(this.paramEndPointService.create(paramEndPoint));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IParamEndPoint>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(paramEndPoint: IParamEndPoint): void {
    this.editForm.patchValue({
      id: paramEndPoint.id,
      codeParam: paramEndPoint.codeParam,
      endPoints: paramEndPoint.endPoints,
      attribute01: paramEndPoint.attribute01,
      attribute02: paramEndPoint.attribute02,
      attribute03: paramEndPoint.attribute03,
      attribute04: paramEndPoint.attribute04,
    });
  }

  protected createFromForm(): IParamEndPoint {
    return {
      ...new ParamEndPoint(),
      id: this.editForm.get(['id'])!.value,
      codeParam: this.editForm.get(['codeParam'])!.value,
      endPoints: this.editForm.get(['endPoints'])!.value,
      attribute01: this.editForm.get(['attribute01'])!.value,
      attribute02: this.editForm.get(['attribute02'])!.value,
      attribute03: this.editForm.get(['attribute03'])!.value,
      attribute04: this.editForm.get(['attribute04'])!.value,
    };
  }
}
