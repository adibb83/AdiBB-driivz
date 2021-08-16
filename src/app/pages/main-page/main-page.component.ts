import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { SataService } from '@services/sata.service';
import { fromEvent, Observable, of, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  @Output() searchKeyUp = new EventEmitter<string>();
  @ViewChild('inputSearch') inputSearch!: ElementRef;
  inputSearch$!: Observable<string>;
  inputSubscription!: Subscription;

  constructor(public sataService: SataService) { }

  ngOnInit(): void {
    this.sataService.startSataListener();
  }
  ngOnDestroy(): void { }
}
