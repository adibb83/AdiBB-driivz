import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { SataModel } from '@models/sata.model';
import { switchMap, tap, share, retry, takeUntil, catchError } from 'rxjs/operators';
import { Observable, Subject, Subscriber, Subscription, throwError, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SataService {
  sub!: Subscription;
  public sataLocationLog$: Observable<SataModel>;
  public sataLocationLog: SataModel[] = [];
  private stopPolling = new Subject();

  constructor(private httpClient: HttpClient) {
    this.sataLocationLog$ = timer(1, 3000).pipe(
      switchMap(() =>
        this.httpClient.get<SataModel>(environment.remoteServer)
      ),
      retry(3),
      share(),
      catchError((e) => this.handleError(e)),
      takeUntil(this.stopPolling)
    )
  }

  startSataListener() {
    this.sub = this.sataLocationLog$.subscribe(res => {
      console.log(res);
      this.sataLocationLog.push(res)
    });
  }

  stopSataListener() {
    this.sub.unsubscribe();
  }

  saveLocationToLog() { }

  deleteLocationFromLog() { }

  saveStateToLocal() { }

  getStateFromLocal() { }

  filterLocations() { }

  showSelectedLocation() { }

  private handleError<T>(e: Error) {
    console.error(e);
    return throwError(e);
  }

}
