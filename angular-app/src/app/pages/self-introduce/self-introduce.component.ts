import { Component, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-self-introduce',
  templateUrl: './self-introduce.component.html',
  styleUrls: ['./self-introduce.component.scss']
})
export class SelfIntroduceComponent implements OnInit {
  intervalId: number = 0;
  seconds = 300;

  constructor() { }

  ngOnInit(): void {
    this.intervalId = window.setInterval(() => {
      this.seconds -= 1;
      if (this.seconds === 0) {
        clearInterval(this.intervalId);;
      }
    }, 1000);
  }

}
