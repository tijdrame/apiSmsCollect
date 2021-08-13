jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ITracking, Tracking } from '../tracking.model';
import { TrackingService } from '../service/tracking.service';

import { TrackingRoutingResolveService } from './tracking-routing-resolve.service';

describe('Service Tests', () => {
  describe('Tracking routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: TrackingRoutingResolveService;
    let service: TrackingService;
    let resultTracking: ITracking | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(TrackingRoutingResolveService);
      service = TestBed.inject(TrackingService);
      resultTracking = undefined;
    });

    describe('resolve', () => {
      it('should return ITracking returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultTracking = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultTracking).toEqual({ id: 123 });
      });

      it('should return new ITracking if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultTracking = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultTracking).toEqual(new Tracking());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultTracking = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultTracking).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
