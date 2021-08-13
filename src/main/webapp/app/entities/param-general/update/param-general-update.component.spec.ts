jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { ParamGeneralService } from '../service/param-general.service';
import { IParamGeneral, ParamGeneral } from '../param-general.model';

import { ParamGeneralUpdateComponent } from './param-general-update.component';

describe('Component Tests', () => {
  describe('ParamGeneral Management Update Component', () => {
    let comp: ParamGeneralUpdateComponent;
    let fixture: ComponentFixture<ParamGeneralUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let paramGeneralService: ParamGeneralService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [ParamGeneralUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(ParamGeneralUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ParamGeneralUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      paramGeneralService = TestBed.inject(ParamGeneralService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const paramGeneral: IParamGeneral = { id: 456 };

        activatedRoute.data = of({ paramGeneral });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(paramGeneral));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const paramGeneral = { id: 123 };
        spyOn(paramGeneralService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ paramGeneral });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: paramGeneral }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(paramGeneralService.update).toHaveBeenCalledWith(paramGeneral);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const paramGeneral = new ParamGeneral();
        spyOn(paramGeneralService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ paramGeneral });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: paramGeneral }));
        saveSubject.complete();

        // THEN
        expect(paramGeneralService.create).toHaveBeenCalledWith(paramGeneral);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const paramGeneral = { id: 123 };
        spyOn(paramGeneralService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ paramGeneral });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(paramGeneralService.update).toHaveBeenCalledWith(paramGeneral);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
