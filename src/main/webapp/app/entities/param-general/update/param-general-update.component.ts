import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import * as dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IParamGeneral, ParamGeneral } from '../param-general.model';
import { ParamGeneralService } from '../service/param-general.service';

@Component({
  selector: 'jhi-param-general-update',
  templateUrl: './param-general-update.component.html',
})
export class ParamGeneralUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    code: [],
    pays: [],
    varString1: [],
    varString2: [],
    varString3: [],
    varInteger1: [],
    varInteger2: [],
    varInteger3: [],
    varDouble1: [],
    varDouble2: [],
    varDouble3: [],
    varInstant: [],
    varDate: [],
    varBoolean: [],
  });

  constructor(protected paramGeneralService: ParamGeneralService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ paramGeneral }) => {
      if (paramGeneral.id === undefined) {
        const today = dayjs().startOf('day');
        paramGeneral.varInstant = today;
      }

      this.updateForm(paramGeneral);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const paramGeneral = this.createFromForm();
    if (paramGeneral.id !== undefined) {
      this.subscribeToSaveResponse(this.paramGeneralService.update(paramGeneral));
    } else {
      this.subscribeToSaveResponse(this.paramGeneralService.create(paramGeneral));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IParamGeneral>>): void {
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

  protected updateForm(paramGeneral: IParamGeneral): void {
    this.editForm.patchValue({
      id: paramGeneral.id,
      code: paramGeneral.code,
      pays: paramGeneral.pays,
      varString1: paramGeneral.varString1,
      varString2: paramGeneral.varString2,
      varString3: paramGeneral.varString3,
      varInteger1: paramGeneral.varInteger1,
      varInteger2: paramGeneral.varInteger2,
      varInteger3: paramGeneral.varInteger3,
      varDouble1: paramGeneral.varDouble1,
      varDouble2: paramGeneral.varDouble2,
      varDouble3: paramGeneral.varDouble3,
      varInstant: paramGeneral.varInstant ? paramGeneral.varInstant.format(DATE_TIME_FORMAT) : null,
      varDate: paramGeneral.varDate,
      varBoolean: paramGeneral.varBoolean,
    });
  }

  protected createFromForm(): IParamGeneral {
    return {
      ...new ParamGeneral(),
      id: this.editForm.get(['id'])!.value,
      code: this.editForm.get(['code'])!.value,
      pays: this.editForm.get(['pays'])!.value,
      varString1: this.editForm.get(['varString1'])!.value,
      varString2: this.editForm.get(['varString2'])!.value,
      varString3: this.editForm.get(['varString3'])!.value,
      varInteger1: this.editForm.get(['varInteger1'])!.value,
      varInteger2: this.editForm.get(['varInteger2'])!.value,
      varInteger3: this.editForm.get(['varInteger3'])!.value,
      varDouble1: this.editForm.get(['varDouble1'])!.value,
      varDouble2: this.editForm.get(['varDouble2'])!.value,
      varDouble3: this.editForm.get(['varDouble3'])!.value,
      varInstant: this.editForm.get(['varInstant'])!.value ? dayjs(this.editForm.get(['varInstant'])!.value, DATE_TIME_FORMAT) : undefined,
      varDate: this.editForm.get(['varDate'])!.value,
      varBoolean: this.editForm.get(['varBoolean'])!.value,
    };
  }
}
