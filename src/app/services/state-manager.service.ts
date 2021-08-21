import { Injectable } from '@angular/core';
import { IStateManager } from '@models/stateManagment.model';

@Injectable({
  providedIn: 'root',
})
export class StateManagerService {
  public currentState!: IStateManager | null;
  constructor() {
    this.getDataFromLocal();
  }

  getDataFromLocal() {
    const localData = localStorage.getItem('state');
    if (typeof localData === 'string') {
      this.currentState = <IStateManager>JSON.parse(localData);
    }

    console.log(this.currentState);
  }

  setDataToLocal(): void {
    localStorage.setItem('state', JSON.stringify(this.currentState));
  }
}
