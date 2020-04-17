import { Component, OnInit, OnDestroy } from '@angular/core';
import { ParticleService } from '../core/particle.service';

/** Interval to request the api in seconds */
const INTERVAL = 10;

@Component({
  selector: 'sg-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  topLevel: number;
  bottomLevel: number;
  showNotifyMe = false;
  showError = false;
  intervalId: number;

  constructor(private particleService: ParticleService) {}

  ngOnInit(): void {
    if (!('Notification' in window)) {
      console.warn('This browser does not support desktop notification');
    } else if (Notification.permission === 'default') {
      this.showNotifyMe = true;
    }
    this.getLevels();
    this.intervalId = window.setInterval(() => {
      this.getLevels();
    }, INTERVAL * 1000);
  }

  getLevels() {
    this.particleService.getLevels().subscribe(
      (levels) => {
        this.topLevel = levels.topLevel;
        this.bottomLevel = levels.bottomLevel;
        this.showError = false;
      },
      () => {
        this.topLevel = null;
        this.bottomLevel = null;
        this.showError = true;
      }
    );
  }

  notifyMe() {
    Notification.requestPermission().then((permission) => {
      if (permission !== 'default') {
        this.showNotifyMe = false;
      }
    });
  }

  ngOnDestroy() {
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
    }
  }
}