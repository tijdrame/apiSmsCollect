jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { ParamEndPointService } from '../service/param-end-point.service';
import { IParamEndPoint, ParamEndPoint } from '../param-end-point.model';

import { ParamEndPointUpdateComponent } from './param-end-point-update.component';

describe('Component Tests', () => {
  describe('ParamEndPoint Management Update Component', () => {
    let comp: ParamEndPointUpdateComponent;
    let fixture: ComponentFixture<ParamEndPointUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let paramEndPointService: ParamEndPointService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [ParamEndPointUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(ParamEndPointUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ParamEndPointUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      paramEndPointService = TestBed.inject(ParamEndPointService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const paramEndPoint: IParamEndPoint = { id: 456 };

        activatedRoute.data = of({ paramEndPoint });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(paramEndPoint));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const paramEndPoint = { id: 123 };
        spyOn(paramEndPointService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ paramEndPoint });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: paramEndPoint }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(paramEndPointService.update).toHaveBeenCalledWith(paramEndPoint);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const paramEndPoint = new ParamEndPoint();
        spyOn(paramEndPointService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ paramEndPoint });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: paramEndPoint }));
        saveSubject.complete();

        // THEN
        expect(paramEndPointService.create).toHaveBeenCalledWith(paramEndPoint);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const paramEndPoint = { id: 123 };
        spyOn(paramEndPointService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ paramEndPoint });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(paramEndPointService.update).toHaveBeenCalledWith(paramEndPoint);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
