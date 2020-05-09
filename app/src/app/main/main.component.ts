import { Component, OnInit, OnDestroy } from '@angular/core';
import { ParticleService } from '../core/particle.service';

/** Interval to request the api in seconds */
const INTERVAL = 10;
/** Time to refill in seconds */
const REFILL_TIMEOUT = 60;

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
  refresh = false;
  refilling = false;

  constructor(private particleService: ParticleService) {}

  ngOnInit(): void {
    /*if (!('Notification' in window)) {
      console.warn('This browser does not support desktop notification');
    } else if (Notification.permission === 'default') {
      this.showNotifyMe = true;
    }*/
    this.getLevels();
  }

  getLevels() {
    this.particleService.getLevels().subscribe(
      (levels) => {
        this.topLevel = levels.topLevel;
        this.bottomLevel = levels.bottomLevel;
        this.showError = false;
        this.refresh = true;
        window.setTimeout(() => {
          this.refresh = false;
        }, 1000);
        window.setTimeout(() => {
          this.getLevels();
        }, INTERVAL * 1000);
      },
      () => {
        this.topLevel = null;
        this.bottomLevel = null;
        this.showError = true;
        window.setTimeout(() => {
          this.getLevels();
        }, INTERVAL * 1000);
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

  refill() {
    this.refilling = true;
    this.particleService.refill().subscribe(
      () => {
        window.setTimeout(() => {
          this.refilling = false;
        }, REFILL_TIMEOUT);
      },
      () => {
        this.refilling = false;
      }
    );
  }

  ngOnDestroy() {
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
    }
  }
}
