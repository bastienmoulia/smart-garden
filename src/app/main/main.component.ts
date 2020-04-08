import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    if (!('Notification' in window)) {
      console.warn('This browser does not support desktop notification');
    } else if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }

}
