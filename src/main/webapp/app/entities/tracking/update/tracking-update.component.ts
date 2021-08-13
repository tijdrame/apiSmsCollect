import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import * as dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { ITracking, Tracking } from '../tracking.model';
import { TrackingService } from '../service/tracking.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-tracking-update',
  templateUrl: './tracking-update.component.html',
})
export class TrackingUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    codeResponse: [null, [Validators.required]],
    endPoint: [null, [Validators.required]],
    loginActeur: [null, [Validators.required]],
    requestId: [null, [Validators.required]],
    dateRequest: [null, [Validators.required]],
    dateResponse: [null, [Validators.required]],
    requestTr: [null, [Validators.required]],
    responseTr: [null, [Validators.required]],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected trackingService: TrackingService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tracking }) => {
      if (tracking.id === undefined) {
        const today = dayjs().startOf('day');
        tracking.dateRequest = today;
        tracking.dateResponse = today;
      }

      this.updateForm(tracking);
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(
          new EventWithContent<AlertError>('apiSmsCollectApp.error', { ...err, key: 'error.file.' + err.key })
        ),
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tracking = this.createFromForm();
    if (tracking.id !== undefined) {
      this.subscribeToSaveResponse(this.trackingService.update(tracking));
    } else {
      this.subscribeToSaveResponse(this.trackingService.create(tracking));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITracking>>): void {
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

  protected updateForm(tracking: ITracking): void {
    this.editForm.patchValue({
      id: tracking.id,
      codeResponse: tracking.codeResponse,
      endPoint: tracking.endPoint,
      loginActeur: tracking.loginActeur,
      requestId: tracking.requestId,
      dateRequest: tracking.dateRequest ? tracking.dateRequest.format(DATE_TIME_FORMAT) : null,
      dateResponse: tracking.dateResponse ? tracking.dateResponse.format(DATE_TIME_FORMAT) : null,
      requestTr: tracking.requestTr,
      responseTr: tracking.responseTr,
    });
  }

  protected createFromForm(): ITracking {
    return {
      ...new Tracking(),
      id: this.editForm.get(['id'])!.value,
      codeResponse: this.editForm.get(['codeResponse'])!.value,
      endPoint: this.editForm.get(['endPoint'])!.value,
      loginActeur: this.editForm.get(['loginActeur'])!.value,
      requestId: this.editForm.get(['requestId'])!.value,
      dateRequest: this.editForm.get(['dateRequest'])!.value
        ? dayjs(this.editForm.get(['dateRequest'])!.value, DATE_TIME_FORMAT)
        : undefined,
      dateResponse: this.editForm.get(['dateResponse'])!.value
        ? dayjs(this.editForm.get(['dateResponse'])!.value, DATE_TIME_FORMAT)
        : undefined,
      requestTr: this.editForm.get(['requestTr'])!.value,
      responseTr: this.editForm.get(['responseTr'])!.value,
    };
  }
}
