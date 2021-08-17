import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ISata } from '@models/sata.model';
import { SnackbarService } from './snack-bar.service';
import {
  switchMap,
  tap,
  share,
  retry,
  takeUntil,
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
} from 'rxjs/operators';
import {
  BehaviorSubject,
  Observable,
  Subject,
  Subscriber,
  Subscription,
  throwError,
  timer,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SataService {
  sub!: Subscription;
  public sataPositionListener$: Observable<ISata>;
  public sataLocationLog: ISata[] = [];
  private stopPolling = new Subject();
  public mapLocation$ = new BehaviorSubject<ISata | null>(null);
  public lastPosition!: ISata;
  public zoom = 2;
  logIndex = 0;

  constructor(
    private httpClient: HttpClient,
    private snackbarService: SnackbarService
  ) {
    this.sataPositionListener$ = timer(1, 3000).pipe(
      switchMap(() => this.httpClient.get<ISata>(environment.remoteServer)),
      retry(3),
      share(),
      catchError((e) => this.handleError(e)),
      takeUntil(this.stopPolling)
    );
  }

  startSataListener() {
    this.sub = this.sataPositionListener$.subscribe((res) => {
      this.mapLocation$.next(res);
      this.lastPosition = res;
    });
  }

  stopSataListener() {
    this.sub.unsubscribe();
  }

  saveLocationToLog(log: ISata) {
    log.id = this.logIndex;
    log.timestamp = log.timestamp * 1000;
    this.sataLocationLog.push(log);
    this.logIndex = ++this.logIndex;
  }

  deleteLocationFromLog(log: ISata, list: ISata[]) {
    console.log('delete', log);
    let index = list.findIndex((e) => e.id === log.id);
    if (index != null) {
      list.splice(index, 1);
      this.snackbarService.append({
        message: `Log ${log.name} deleted`,
        type: 'seccses',
      });
    }
  }

  saveStateToLocal() {}

  getStateFromLocal() {}

  filterLocations() {}

  showSelectedLocation() {}

  searchEntries(term: string): ISata[] {
    if (term.length === 0) {
      return this.sataLocationLog;
    }
    return this.sataLocationLog.filter(
      (log) =>
        log.name != null &&
        log.name.toLocaleLowerCase().includes(term.toLocaleLowerCase())
    );
  }

  private handleError<T>(e: Error) {
    console.error(e);
    return throwError(e);
  }
}
