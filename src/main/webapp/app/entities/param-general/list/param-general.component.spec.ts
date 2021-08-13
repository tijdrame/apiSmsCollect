import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ParamGeneralService } from '../service/param-general.service';

import { ParamGeneralComponent } from './param-general.component';

describe('Component Tests', () => {
  describe('ParamGeneral Management Component', () => {
    let comp: ParamGeneralComponent;
    let fixture: ComponentFixture<ParamGeneralComponent>;
    let service: ParamGeneralService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [ParamGeneralComponent],
      })
        .overrideTemplate(ParamGeneralComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ParamGeneralComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(ParamGeneralService);

      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [{ id: 123 }],
            headers,
          })
        )
      );
    });

    it('Should call load all on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.paramGenerals?.[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
