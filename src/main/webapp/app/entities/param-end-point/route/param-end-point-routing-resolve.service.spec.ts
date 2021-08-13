jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IParamEndPoint, ParamEndPoint } from '../param-end-point.model';
import { ParamEndPointService } from '../service/param-end-point.service';

import { ParamEndPointRoutingResolveService } from './param-end-point-routing-resolve.service';

describe('Service Tests', () => {
  describe('ParamEndPoint routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: ParamEndPointRoutingResolveService;
    let service: ParamEndPointService;
    let resultParamEndPoint: IParamEndPoint | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(ParamEndPointRoutingResolveService);
      service = TestBed.inject(ParamEndPointService);
      resultParamEndPoint = undefined;
    });

    describe('resolve', () => {
      it('should return IParamEndPoint returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultParamEndPoint = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultParamEndPoint).toEqual({ id: 123 });
      });

      it('should return new IParamEndPoint if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultParamEndPoint = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultParamEndPoint).toEqual(new ParamEndPoint());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultParamEndPoint = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultParamEndPoint).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
