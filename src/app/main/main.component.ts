import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sg-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  topLevel: number;
  bottomLevel: number;
  constructor() {}

  ngOnInit(): void {
    if (!('Notification' in window)) {
      console.warn('This browser does not support desktop notification');
    } else if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
    this.topLevel = Math.random() * 100;
    this.bottomLevel = Math.random() * 100;
  }
}
