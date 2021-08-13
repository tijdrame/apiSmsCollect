import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IParamGeneral } from '../param-general.model';

@Component({
  selector: 'jhi-param-general-detail',
  templateUrl: './param-general-detail.component.html',
})
export class ParamGeneralDetailComponent implements OnInit {
  paramGeneral: IParamGeneral | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ paramGeneral }) => {
      this.paramGeneral = paramGeneral;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
