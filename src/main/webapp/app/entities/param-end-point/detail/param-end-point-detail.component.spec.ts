import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ParamEndPointDetailComponent } from './param-end-point-detail.component';

describe('Component Tests', () => {
  describe('ParamEndPoint Management Detail Component', () => {
    let comp: ParamEndPointDetailComponent;
    let fixture: ComponentFixture<ParamEndPointDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ParamEndPointDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ paramEndPoint: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(ParamEndPointDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ParamEndPointDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load paramEndPoint on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.paramEndPoint).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
