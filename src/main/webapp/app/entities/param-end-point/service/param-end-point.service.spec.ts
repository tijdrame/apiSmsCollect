import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IParamEndPoint, ParamEndPoint } from '../param-end-point.model';

import { ParamEndPointService } from './param-end-point.service';

describe('Service Tests', () => {
  describe('ParamEndPoint Service', () => {
    let service: ParamEndPointService;
    let httpMock: HttpTestingController;
    let elemDefault: IParamEndPoint;
    let expectedResult: IParamEndPoint | IParamEndPoint[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(ParamEndPointService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        codeParam: 'AAAAAAA',
        endPoints: 'AAAAAAA',
        attribute01: 'AAAAAAA',
        attribute02: 'AAAAAAA',
        attribute03: 'AAAAAAA',
        attribute04: 'AAAAAAA',
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a ParamEndPoint', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new ParamEndPoint()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a ParamEndPoint', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            codeParam: 'BBBBBB',
            endPoints: 'BBBBBB',
            attribute01: 'BBBBBB',
            attribute02: 'BBBBBB',
            attribute03: 'BBBBBB',
            attribute04: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a ParamEndPoint', () => {
        const patchObject = Object.assign(
          {
            endPoints: 'BBBBBB',
          },
          new ParamEndPoint()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of ParamEndPoint', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            codeParam: 'BBBBBB',
            endPoints: 'BBBBBB',
            attribute01: 'BBBBBB',
            attribute02: 'BBBBBB',
            attribute03: 'BBBBBB',
            attribute04: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a ParamEndPoint', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addParamEndPointToCollectionIfMissing', () => {
        it('should add a ParamEndPoint to an empty array', () => {
          const paramEndPoint: IParamEndPoint = { id: 123 };
          expectedResult = service.addParamEndPointToCollectionIfMissing([], paramEndPoint);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(paramEndPoint);
        });

        it('should not add a ParamEndPoint to an array that contains it', () => {
          const paramEndPoint: IParamEndPoint = { id: 123 };
          const paramEndPointCollection: IParamEndPoint[] = [
            {
              ...paramEndPoint,
            },
            { id: 456 },
          ];
          expectedResult = service.addParamEndPointToCollectionIfMissing(paramEndPointCollection, paramEndPoint);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a ParamEndPoint to an array that doesn't contain it", () => {
          const paramEndPoint: IParamEndPoint = { id: 123 };
          const paramEndPointCollection: IParamEndPoint[] = [{ id: 456 }];
          expectedResult = service.addParamEndPointToCollectionIfMissing(paramEndPointCollection, paramEndPoint);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(paramEndPoint);
        });

        it('should add only unique ParamEndPoint to an array', () => {
          const paramEndPointArray: IParamEndPoint[] = [{ id: 123 }, { id: 456 }, { id: 96445 }];
          const paramEndPointCollection: IParamEndPoint[] = [{ id: 123 }];
          expectedResult = service.addParamEndPointToCollectionIfMissing(paramEndPointCollection, ...paramEndPointArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const paramEndPoint: IParamEndPoint = { id: 123 };
          const paramEndPoint2: IParamEndPoint = { id: 456 };
          expectedResult = service.addParamEndPointToCollectionIfMissing([], paramEndPoint, paramEndPoint2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(paramEndPoint);
          expect(expectedResult).toContain(paramEndPoint2);
        });

        it('should accept null and undefined values', () => {
          const paramEndPoint: IParamEndPoint = { id: 123 };
          expectedResult = service.addParamEndPointToCollectionIfMissing([], null, paramEndPoint, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(paramEndPoint);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
