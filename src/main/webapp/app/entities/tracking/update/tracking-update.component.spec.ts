jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { TrackingService } from '../service/tracking.service';
import { ITracking, Tracking } from '../tracking.model';

import { TrackingUpdateComponent } from './tracking-update.component';

describe('Component Tests', () => {
  describe('Tracking Management Update Component', () => {
    let comp: TrackingUpdateComponent;
    let fixture: ComponentFixture<TrackingUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let trackingService: TrackingService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [TrackingUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(TrackingUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TrackingUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      trackingService = TestBed.inject(TrackingService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const tracking: ITracking = { id: 456 };

        activatedRoute.data = of({ tracking });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(tracking));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const tracking = { id: 123 };
        spyOn(trackingService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ tracking });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: tracking }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(trackingService.update).toHaveBeenCalledWith(tracking);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const tracking = new Tracking();
        spyOn(trackingService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ tracking });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: tracking }));
        saveSubject.complete();

        // THEN
        expect(trackingService.create).toHaveBeenCalledWith(tracking);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const tracking = { id: 123 };
        spyOn(trackingService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ tracking });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(trackingService.update).toHaveBeenCalledWith(tracking);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
