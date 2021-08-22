import { AfterViewInit } from '@angular/core';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ISata } from '@models/sata.model';

@Component({
  selector: 'app-location-ref',
  templateUrl: './location-ref.component.html',
  styleUrls: ['./location-ref.component.scss'],
})
export class LocationRefComponent implements AfterViewInit {
  @Input('log-item') logItem!: ISata;
  @Input('isSelected') isSelected!: boolean;
  @Output() deleteLog = new EventEmitter<ISata>();

  ngAfterViewInit() {
    console.log(this.logItem);
  }

  delete() {
    this.deleteLog.emit(this.logItem);
  }
}
