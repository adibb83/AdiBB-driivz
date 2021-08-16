export class SataModel {
  message!: string;
  timestamp!: number;
  iss_position!: IssPositionModel;
}

export class IssPositionModel {
  latitude!: number;
  longitude!: number;
}
