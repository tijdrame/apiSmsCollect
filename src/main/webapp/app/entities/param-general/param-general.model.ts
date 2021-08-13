import * as dayjs from 'dayjs';

export interface IParamGeneral {
  id?: number;
  code?: string | null;
  pays?: string | null;
  varString1?: string | null;
  varString2?: string | null;
  varString3?: string | null;
  varInteger1?: number | null;
  varInteger2?: number | null;
  varInteger3?: number | null;
  varDouble1?: number | null;
  varDouble2?: number | null;
  varDouble3?: number | null;
  varInstant?: dayjs.Dayjs | null;
  varDate?: dayjs.Dayjs | null;
  varBoolean?: boolean | null;
}

export class ParamGeneral implements IParamGeneral {
  constructor(
    public id?: number,
    public code?: string | null,
    public pays?: string | null,
    public varString1?: string | null,
    public varString2?: string | null,
    public varString3?: string | null,
    public varInteger1?: number | null,
    public varInteger2?: number | null,
    public varInteger3?: number | null,
    public varDouble1?: number | null,
    public varDouble2?: number | null,
    public varDouble3?: number | null,
    public varInstant?: dayjs.Dayjs | null,
    public varDate?: dayjs.Dayjs | null,
    public varBoolean?: boolean | null
  ) {
    this.varBoolean = this.varBoolean ?? false;
  }
}

export function getParamGeneralIdentifier(paramGeneral: IParamGeneral): number | undefined {
  return paramGeneral.id;
}
