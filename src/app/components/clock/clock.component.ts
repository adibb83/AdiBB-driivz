import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss'],
})
export class ClockComponent implements OnInit {
  sub!: Subscription;
  hours!: string;
  minutes!: string;
  seconds!: string;

  ngOnInit() {
    this.setCurrentTime();
    this.updateTime();
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  private setCurrentTime() {
    const time = new Date(Date.now());
    this.hours = this.leftPadZero(time.getHours());
    this.minutes = this.leftPadZero(time.getMinutes());
    this.seconds = this.leftPadZero(time.getSeconds());
  }

  private updateTime() {
    const source = interval(1000);
    this.sub = source.subscribe((c) => {
      this.setCurrentTime();
    });
  }

  private leftPadZero(value: number) {
    return value < 10 ? `0${value}` : value.toString();
  }
}
