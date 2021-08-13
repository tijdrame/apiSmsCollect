import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ITracking, Tracking } from '../tracking.model';

import { TrackingService } from './tracking.service';

describe('Service Tests', () => {
  describe('Tracking Service', () => {
    let service: TrackingService;
    let httpMock: HttpTestingController;
    let elemDefault: ITracking;
    let expectedResult: ITracking | ITracking[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(TrackingService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        codeResponse: 'AAAAAAA',
        endPoint: 'AAAAAAA',
        loginActeur: 'AAAAAAA',
        requestId: 'AAAAAAA',
        dateRequest: currentDate,
        dateResponse: currentDate,
        requestTr: 'AAAAAAA',
        responseTr: 'AAAAAAA',
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dateRequest: currentDate.format(DATE_TIME_FORMAT),
            dateResponse: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Tracking', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateRequest: currentDate.format(DATE_TIME_FORMAT),
            dateResponse: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateRequest: currentDate,
            dateResponse: currentDate,
          },
          returnedFromService
        );

        service.create(new Tracking()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Tracking', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            codeResponse: 'BBBBBB',
            endPoint: 'BBBBBB',
            loginActeur: 'BBBBBB',
            requestId: 'BBBBBB',
            dateRequest: currentDate.format(DATE_TIME_FORMAT),
            dateResponse: currentDate.format(DATE_TIME_FORMAT),
            requestTr: 'BBBBBB',
            responseTr: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateRequest: currentDate,
            dateResponse: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Tracking', () => {
        const patchObject = Object.assign(
          {
            codeResponse: 'BBBBBB',
            loginActeur: 'BBBBBB',
            responseTr: 'BBBBBB',
          },
          new Tracking()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            dateRequest: currentDate,
            dateResponse: currentDate,
          },
          returnedFromService
        );

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Tracking', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            codeResponse: 'BBBBBB',
            endPoint: 'BBBBBB',
            loginActeur: 'BBBBBB',
            requestId: 'BBBBBB',
            dateRequest: currentDate.format(DATE_TIME_FORMAT),
            dateResponse: currentDate.format(DATE_TIME_FORMAT),
            requestTr: 'BBBBBB',
            responseTr: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateRequest: currentDate,
            dateResponse: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Tracking', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addTrackingToCollectionIfMissing', () => {
        it('should add a Tracking to an empty array', () => {
          const tracking: ITracking = { id: 123 };
          expectedResult = service.addTrackingToCollectionIfMissing([], tracking);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(tracking);
        });

        it('should not add a Tracking to an array that contains it', () => {
          const tracking: ITracking = { id: 123 };
          const trackingCollection: ITracking[] = [
            {
              ...tracking,
            },
            { id: 456 },
          ];
          expectedResult = service.addTrackingToCollectionIfMissing(trackingCollection, tracking);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Tracking to an array that doesn't contain it", () => {
          const tracking: ITracking = { id: 123 };
          const trackingCollection: ITracking[] = [{ id: 456 }];
          expectedResult = service.addTrackingToCollectionIfMissing(trackingCollection, tracking);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(tracking);
        });

        it('should add only unique Tracking to an array', () => {
          const trackingArray: ITracking[] = [{ id: 123 }, { id: 456 }, { id: 40719 }];
          const trackingCollection: ITracking[] = [{ id: 123 }];
          expectedResult = service.addTrackingToCollectionIfMissing(trackingCollection, ...trackingArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const tracking: ITracking = { id: 123 };
          const tracking2: ITracking = { id: 456 };
          expectedResult = service.addTrackingToCollectionIfMissing([], tracking, tracking2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(tracking);
          expect(expectedResult).toContain(tracking2);
        });

        it('should accept null and undefined values', () => {
          const tracking: ITracking = { id: 123 };
          expectedResult = service.addTrackingToCollectionIfMissing([], null, tracking, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(tracking);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
