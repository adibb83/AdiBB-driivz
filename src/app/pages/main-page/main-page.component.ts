import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ISata } from '@models/sata.model';
import { SataService } from '@services/sata-service/sata.service';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, AfterViewInit {

  form: FormGroup = new FormGroup({
    search: new FormControl(null),
  });

  filteredLogList$!: Observable<ISata[]>;
  sub!: Subscription;

  constructor(public sataService: SataService) { }

  get search() {
    return this.form.get('search') as FormControl;
  }

  ngOnInit(): void {
    this.filteredLogList$ = this.sataService.savedLocations$;
    this.searchFilter();
  }

  ngAfterViewInit() {
    this.isfiltered();
    this.isSelected();
  }

  // check if filter string from local storage
  isfiltered() {
    if (this.sataService.filter.length !== 0) {
      this.search.patchValue(this.sataService.filter);
      this.search.markAsTouched;
    }
  }

  // check if left side bar item was selected from local storage
  isSelected() {
    if (this.sataService.selectedID === -1) {
      this.sataService.startSataListener();
    } else {
      const sata = this.sataService.getLocationById(
        this.sataService.selectedID
      );
      this.sataService.zoom = 7;
      if (sata) {
        this.sataService.mapLocation$.next(sata);
      }
    }
  }

  // listen to search input value changes for filtering Log list
  searchFilter() {
    this.sub = this.search.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(
          (res) => (this.filteredLogList$ = this.sataService.searchEntries(res))
        )
      )
      .subscribe();
  }

  // left side bar item was selected/unselected
  selectLocation(item: ISata) {
    item.id != this.sataService.selectedID || this.sataService.selectedID === -1 ?
      this.zoomInToSelectedLocation(item) : this.zoomOutToCurrentLocation();
  }


  zoomInToSelectedLocation(item: ISata) {
    if (item.id) {
      this.sataService.selectedID = item.id;
    }
    this.sataService.stopSataListener();
    this.sataService.zoom = 7;
    this.sataService.mapLocation$.next(item);
    this.sataService.setToLocal();
  }

  zoomOutToCurrentLocation() {
    this.sataService.selectedID = -1;
    this.sataService.zoom = 3;
    this.sataService.startSataListener();
    this.sataService.setToLocal();
  }


  // delete item from Log List
  deleteLog(event: ISata) {
    this.sataService.deleteLocationFromLog(
      event,
      this.sataService.sataLocationLog
    );
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
