export class SataModel {
  message!: string;
  timestamp!: number;
  position!: IssPositionModel;
}

export class IssPositionModel {
  latitude!: number;
  longitude!: number;
}
