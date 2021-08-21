import { ISata } from './sata.model';

export interface IStateManager {
  sataLocationLog: ISata[];
  zoom: number;
  filter: string;
  selectedID: number;
  logIndex: number;
}
