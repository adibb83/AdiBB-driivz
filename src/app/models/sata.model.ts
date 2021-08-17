export interface ISata {
  id?: number;
  name?: string;
  message: string;
  timestamp: number;
  iss_position: IIssPosition;
}

export class IIssPosition {
  latitude!: string;
  longitude!: string;
}
