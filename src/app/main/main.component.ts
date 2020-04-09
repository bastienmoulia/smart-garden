import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sg-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  topLevel: number;
  bottomLevel: number;
  showNotifyMe = false;
  constructor() {}

  ngOnInit(): void {
    if (!('Notification' in window)) {
      console.warn('This browser does not support desktop notification');
    } else if (Notification.permission === 'default') {
      this.showNotifyMe = true;
    }
    this.topLevel = Math.random() * 100;
    this.bottomLevel = Math.random() * 100;
  }

  notifyMe() {
    Notification.requestPermission().then((permission) => {
      if (permission !== 'default') {
        this.showNotifyMe = false;
      }
    });
  }
}
