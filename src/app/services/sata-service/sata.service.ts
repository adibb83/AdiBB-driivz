import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ISata } from '@models/sata.model';
import { SnackbarService } from '../snack-bar.service';
import {
  switchMap,
  tap,
  share,
  retry,
  takeUntil,
  catchError,
  map,
} from 'rxjs/operators';
import {
  BehaviorSubject,
  Observable,
  Subject,
  Subscription,
  throwError,
  timer,
} from 'rxjs';

import { StateManagerService } from '../state-manager.service';

@Injectable({
  providedIn: 'root',
})
export class SataService implements OnDestroy {
  sub!: Subscription;
  readonly API_URL = environment.remoteServer;
  private dashData$ = new BehaviorSubject<ISata[]>([]);
  public sataPositionListener$!: Observable<ISata>;
  public sataLocationLog: ISata[] = [];
  private stopPolling = new Subject();
  public mapLocation$ = new BehaviorSubject<ISata | null>(null);
  public lastPosition!: ISata;
  public selectedID = -1;
  public zoom = 2;
  logIndex = 0;
  filter = '';

  constructor(
    private httpClient: HttpClient,
    private snackbarService: SnackbarService,
    private stateManagerService: StateManagerService
  ) {
    this.initData();
    this.getFromLocal();
  }

  get savedLocations$() {
    return this.dashData$.asObservable();
  }

  // declare timer for api call - get satellite location
  initData() {
    this.sataPositionListener$ = timer(1, 3000).pipe(
      switchMap(() => this.getSataCurrentLocation()),
      retry(3),
      share(),
      catchError((e) => this.handleError(e)),
      takeUntil(this.stopPolling)
    );
  }

  // http call for current satellite location
  getSataCurrentLocation(): Observable<ISata> {
    return this.httpClient.get<ISata>(this.API_URL);
  }

  // subscribe to timer to start data stream
  startSataListener() {
    this.sub = this.sataPositionListener$.subscribe((res) => {
      res.timestamp = res.timestamp * 1000;
      this.mapLocation$.next(res);
      this.lastPosition = res;
    });
  }

  //unsubscribe from timer to stop data stream
  stopSataListener() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  // save requested satellite location to log list
  saveLocationToLog(log: ISata) {
    log.id = this.logIndex;
    this.sataLocationLog.push(log);
    this.logIndex = ++this.logIndex;
    this.dashData$.next(this.sataLocationLog);
    this.setToLocal();
  }

  // delete location from log list
  deleteLocationFromLog(log: ISata, list: ISata[]) {
    let index = list.findIndex((e) => e.id === log.id);
    if (index != null) {
      list.splice(index, 1);
      this.dashData$.next(list);
      this.setToLocal();
      this.snackbarService.append({
        message: `Log ${log.name} deleted`,
        type: 'seccses',
      });
    }
  }

  // typeahead string to filter log list by item name
  searchEntries(term: string): Observable<ISata[]> {
    this.filter = term;
    this.setToLocal();
    if (term.length === 0) {
      return this.dashData$;
    }
    return this.dashData$.pipe(
      map((m) =>
        m.filter(
          (log) =>
            log.name != null &&
            log.name.toLocaleLowerCase().includes(term.toLocaleLowerCase())
        )
      )
    );
  }

  // set current state to local storage
  setToLocal() {
    this.stateManagerService.currentState = {
      zoom: this.zoom,
      logIndex: this.logIndex,
      sataLocationLog: this.sataLocationLog,
      selectedID: this.selectedID,
      filter: this.filter,
    };
    this.stateManagerService.setDataToLocal();
  }

  // get last state from local storage
  getFromLocal() {
    this.stateManagerService.getDataFromLocal();
    if (this.stateManagerService.currentState) {
      this.zoom = this.stateManagerService.currentState.zoom;
      this.logIndex = this.stateManagerService.currentState.logIndex;
      this.sataLocationLog =
        this.stateManagerService.currentState.sataLocationLog;
      this.selectedID = this.stateManagerService.currentState.selectedID;
      this.filter = this.stateManagerService.currentState.filter;
      this.dashData$.next(this.sataLocationLog);
    }
  }

  getLocationById(id: number): ISata | undefined {
    return this.sataLocationLog.find((log) => log.id === id);
  }

  // hendle error this should be in separate service for big projects
  private handleError<T>(e: Error) {
    console.error(e);
    return throwError(e);
  }

  ngOnDestroy() {
    this.stopPolling.next();
    this.stopSataListener();
  }
}
