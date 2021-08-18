import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ISata } from '@models/sata.model';
import { SataService } from '@services/sata.service';
import { fromEvent, Observable, of, Subscription } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  search: FormControl = new FormControl();
  public filterdLogList: ISata[] = [];
  @Output() searchKeyUp = new EventEmitter<string>();
  @ViewChild('inputSearch', { static: true }) inputSearch!: ElementRef;
  inputSubscription!: Subscription;
  selectedID: number | undefined = -1;

  constructor(public sataService: SataService) {}

  ngOnInit(): void {
    this.filterdLogList = this.sataService.sataLocationLog;
    this.sataService.startSataListener();
    this.search.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((res) => of(this.sataService.searchEntries(res)))
      )
      .subscribe((res) => {
        this.filterdLogList = res;
      });
  }

  selectLocation(item: ISata) {
    if (item.id != this.selectedID || this.selectedID === -1) {
      console.log('selectd', item);
      this.selectedID = item?.id;
      this.sataService.stopSataListener();
      this.sataService.zoom = 7;
      this.sataService.mapLocation$.next(item);
    } else {
      console.log('UNselectd');
      this.selectedID = -1;
      this.sataService.zoom = 3;
      this.sataService.startSataListener();
    }
  }

  deleteLog(event: ISata) {
    this.sataService.deleteLocationFromLog(
      event,
      this.sataService.sataLocationLog
    );
  }

  ngOnDestroy(): void {}
}
