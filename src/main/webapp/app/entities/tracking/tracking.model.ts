import * as dayjs from 'dayjs';

export interface ITracking {
  id?: number;
  codeResponse?: string;
  endPoint?: string;
  loginActeur?: string;
  requestId?: string;
  dateRequest?: dayjs.Dayjs;
  dateResponse?: dayjs.Dayjs;
  requestTr?: string;
  responseTr?: string;
}

export class Tracking implements ITracking {
  constructor(
    public id?: number,
    public codeResponse?: string,
    public endPoint?: string,
    public loginActeur?: string,
    public requestId?: string,
    public dateRequest?: dayjs.Dayjs,
    public dateResponse?: dayjs.Dayjs,
    public requestTr?: string,
    public responseTr?: string
  ) {}
}

export function getTrackingIdentifier(tracking: ITracking): number | undefined {
  return tracking.id;
}
