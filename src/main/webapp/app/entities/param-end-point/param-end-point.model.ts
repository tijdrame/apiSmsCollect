export interface IParamEndPoint {
  id?: number;
  codeParam?: string | null;
  endPoints?: string | null;
  attribute01?: string | null;
  attribute02?: string | null;
  attribute03?: string | null;
  attribute04?: string | null;
}

export class ParamEndPoint implements IParamEndPoint {
  constructor(
    public id?: number,
    public codeParam?: string | null,
    public endPoints?: string | null,
    public attribute01?: string | null,
    public attribute02?: string | null,
    public attribute03?: string | null,
    public attribute04?: string | null
  ) {}
}

export function getParamEndPointIdentifier(paramEndPoint: IParamEndPoint): number | undefined {
  return paramEndPoint.id;
}
