import { AfterViewInit, Component } from '@angular/core';
import { ISata } from '@models/sata.model';
import { SataService } from '@services/sata.service';
import { Subscription } from 'rxjs';
import { delay, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-current-postion',
  templateUrl: './current-postion.component.html',
  styleUrls: ['./current-postion.component.scss'],
})
export class CurrentPostionComponent implements AfterViewInit {
  sub!: Subscription;
  logItem!: ISata;

  constructor(public sataService: SataService) {}

  ngAfterViewInit() {
    this.sub = this.sataService.mapLocation$
      .pipe(startWith(null), delay(0))
      .subscribe((loc: ISata | null) => {
        if (loc != null) {
          this.logItem = loc;
        }
      });
  }
}
