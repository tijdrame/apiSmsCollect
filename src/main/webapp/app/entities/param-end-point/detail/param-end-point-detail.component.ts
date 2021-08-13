import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IParamEndPoint } from '../param-end-point.model';

@Component({
  selector: 'jhi-param-end-point-detail',
  templateUrl: './param-end-point-detail.component.html',
})
export class ParamEndPointDetailComponent implements OnInit {
  paramEndPoint: IParamEndPoint | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ paramEndPoint }) => {
      this.paramEndPoint = paramEndPoint;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
