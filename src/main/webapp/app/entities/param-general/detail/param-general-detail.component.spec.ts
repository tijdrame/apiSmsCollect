import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ParamGeneralDetailComponent } from './param-general-detail.component';

describe('Component Tests', () => {
  describe('ParamGeneral Management Detail Component', () => {
    let comp: ParamGeneralDetailComponent;
    let fixture: ComponentFixture<ParamGeneralDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ParamGeneralDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ paramGeneral: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(ParamGeneralDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ParamGeneralDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load paramGeneral on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.paramGeneral).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
