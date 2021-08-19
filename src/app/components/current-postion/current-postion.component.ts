import { Component, OnInit } from '@angular/core';
import { ISata } from '@models/sata.model';
import { SataService } from '@services/sata.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-current-postion',
  templateUrl: './current-postion.component.html',
  styleUrls: ['./current-postion.component.scss'],
})
export class CurrentPostionComponent implements OnInit {
  sub!: Subscription;
  logItem!: ISata;

  constructor(public sataService: SataService) {}

  ngOnInit(): void {
    this.sub = this.sataService.mapLocation$.subscribe((loc: ISata | null) => {
      if (loc != null) {
        this.logItem = loc;
      }
    });
  }
}
