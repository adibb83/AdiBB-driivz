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
  filterdLogList$!: Observable<ISata[]>;
  sub!: Subscription;

  constructor(public sataService: SataService) {}

  get search() {
    return this.form.get('search') as FormControl;
  }

  ngOnInit(): void {
    this.filterdLogList$ = this.sataService.savedLocations$;
    this.searchFilter();
  }

  ngAfterViewInit() {
    this.isFilterd();
    this.isSelected();
  }

  isFilterd() {
    if (this.sataService.filter.length !== 0) {
      this.search.patchValue(this.sataService.filter);
      this.search.markAsTouched;
    }
  }

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

  searchFilter() {
    this.sub = this.search.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(
          (res) => (this.filterdLogList$ = this.sataService.searchEntries(res))
        )
      )
      .subscribe();
  }

  selectLocation(item: ISata) {
    if (
      item.id != this.sataService.selectedID ||
      this.sataService.selectedID === -1
    ) {
      if (item.id) {
        this.sataService.selectedID = item.id;
      }
      this.sataService.stopSataListener();
      this.sataService.zoom = 7;
      this.sataService.mapLocation$.next(item);
      this.sataService.setToLocal();
    } else {
      this.sataService.selectedID = -1;
      this.sataService.zoom = 3;
      this.sataService.startSataListener();
      this.sataService.setToLocal();
    }
  }

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
