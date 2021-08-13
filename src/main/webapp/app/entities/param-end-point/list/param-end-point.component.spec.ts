import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ParamEndPointService } from '../service/param-end-point.service';

import { ParamEndPointComponent } from './param-end-point.component';

describe('Component Tests', () => {
  describe('ParamEndPoint Management Component', () => {
    let comp: ParamEndPointComponent;
    let fixture: ComponentFixture<ParamEndPointComponent>;
    let service: ParamEndPointService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [ParamEndPointComponent],
      })
        .overrideTemplate(ParamEndPointComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ParamEndPointComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(ParamEndPointService);

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
      expect(comp.paramEndPoints?.[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
