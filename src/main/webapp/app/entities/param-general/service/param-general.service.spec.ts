import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_FORMAT, DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IParamGeneral, ParamGeneral } from '../param-general.model';

import { ParamGeneralService } from './param-general.service';

describe('Service Tests', () => {
  describe('ParamGeneral Service', () => {
    let service: ParamGeneralService;
    let httpMock: HttpTestingController;
    let elemDefault: IParamGeneral;
    let expectedResult: IParamGeneral | IParamGeneral[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(ParamGeneralService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        code: 'AAAAAAA',
        pays: 'AAAAAAA',
        varString1: 'AAAAAAA',
        varString2: 'AAAAAAA',
        varString3: 'AAAAAAA',
        varInteger1: 0,
        varInteger2: 0,
        varInteger3: 0,
        varDouble1: 0,
        varDouble2: 0,
        varDouble3: 0,
        varInstant: currentDate,
        varDate: currentDate,
        varBoolean: false,
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            varInstant: currentDate.format(DATE_TIME_FORMAT),
            varDate: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a ParamGeneral', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            varInstant: currentDate.format(DATE_TIME_FORMAT),
            varDate: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            varInstant: currentDate,
            varDate: currentDate,
          },
          returnedFromService
        );

        service.create(new ParamGeneral()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a ParamGeneral', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            code: 'BBBBBB',
            pays: 'BBBBBB',
            varString1: 'BBBBBB',
            varString2: 'BBBBBB',
            varString3: 'BBBBBB',
            varInteger1: 1,
            varInteger2: 1,
            varInteger3: 1,
            varDouble1: 1,
            varDouble2: 1,
            varDouble3: 1,
            varInstant: currentDate.format(DATE_TIME_FORMAT),
            varDate: currentDate.format(DATE_FORMAT),
            varBoolean: true,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            varInstant: currentDate,
            varDate: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a ParamGeneral', () => {
        const patchObject = Object.assign(
          {
            varString3: 'BBBBBB',
            varInstant: currentDate.format(DATE_TIME_FORMAT),
            varDate: currentDate.format(DATE_FORMAT),
            varBoolean: true,
          },
          new ParamGeneral()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            varInstant: currentDate,
            varDate: currentDate,
          },
          returnedFromService
        );

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of ParamGeneral', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            code: 'BBBBBB',
            pays: 'BBBBBB',
            varString1: 'BBBBBB',
            varString2: 'BBBBBB',
            varString3: 'BBBBBB',
            varInteger1: 1,
            varInteger2: 1,
            varInteger3: 1,
            varDouble1: 1,
            varDouble2: 1,
            varDouble3: 1,
            varInstant: currentDate.format(DATE_TIME_FORMAT),
            varDate: currentDate.format(DATE_FORMAT),
            varBoolean: true,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            varInstant: currentDate,
            varDate: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a ParamGeneral', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addParamGeneralToCollectionIfMissing', () => {
        it('should add a ParamGeneral to an empty array', () => {
          const paramGeneral: IParamGeneral = { id: 123 };
          expectedResult = service.addParamGeneralToCollectionIfMissing([], paramGeneral);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(paramGeneral);
        });

        it('should not add a ParamGeneral to an array that contains it', () => {
          const paramGeneral: IParamGeneral = { id: 123 };
          const paramGeneralCollection: IParamGeneral[] = [
            {
              ...paramGeneral,
            },
            { id: 456 },
          ];
          expectedResult = service.addParamGeneralToCollectionIfMissing(paramGeneralCollection, paramGeneral);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a ParamGeneral to an array that doesn't contain it", () => {
          const paramGeneral: IParamGeneral = { id: 123 };
          const paramGeneralCollection: IParamGeneral[] = [{ id: 456 }];
          expectedResult = service.addParamGeneralToCollectionIfMissing(paramGeneralCollection, paramGeneral);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(paramGeneral);
        });

        it('should add only unique ParamGeneral to an array', () => {
          const paramGeneralArray: IParamGeneral[] = [{ id: 123 }, { id: 456 }, { id: 37380 }];
          const paramGeneralCollection: IParamGeneral[] = [{ id: 123 }];
          expectedResult = service.addParamGeneralToCollectionIfMissing(paramGeneralCollection, ...paramGeneralArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const paramGeneral: IParamGeneral = { id: 123 };
          const paramGeneral2: IParamGeneral = { id: 456 };
          expectedResult = service.addParamGeneralToCollectionIfMissing([], paramGeneral, paramGeneral2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(paramGeneral);
          expect(expectedResult).toContain(paramGeneral2);
        });

        it('should accept null and undefined values', () => {
          const paramGeneral: IParamGeneral = { id: 123 };
          expectedResult = service.addParamGeneralToCollectionIfMissing([], null, paramGeneral, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(paramGeneral);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
