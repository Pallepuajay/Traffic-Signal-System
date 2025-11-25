import { Component } from '@angular/core';
import { TrafficLight } from '../traffic-light/traffic-light';

@Component({
  selector: 'app-controller',
  imports: [TrafficLight],
  templateUrl: './controller.html',
  styleUrls: ['./controller.scss'],
})
export class Controller {
  public remainingTime = 0;
  public currentLight = 'red';

  timer: any = null;
  interval: any = null;

  
  // NIGHT MODE
 
  nightMode = false;
  blinkInterval: any;

  toggleNightMode() {
    this.nightMode = !this.nightMode;

    if (this.nightMode) {
      this.startNightMode();
    } else {
      this.stopNightMode();
    }
  }

  startNightMode() {
    // stop everything
    this.autoMode = false;
    clearTimeout(this.timer);
    clearInterval(this.interval);
    clearInterval(this.blinkInterval);

    this.currentLight = 'yellow';

    // blink yellow
    this.blinkInterval = setInterval(() => {
      this.currentLight = this.currentLight === 'yellow' ? 'off' : 'yellow';
    }, 1000);
  }

  stopNightMode() {
    clearInterval(this.blinkInterval);
    this.currentLight = 'red';
    this.remainingTime = 0;
  }


  // EMERGENCY MODE
  
  emergencyActive = false;

  emergencyMode() {
    if (this.nightMode) {
      this.stopNightMode();
      this.nightMode = false;
    }

    this.emergencyActive = true;

    this.autoMode = false;
    clearTimeout(this.timer);
    clearInterval(this.interval);
    clearInterval(this.blinkInterval);

    this.currentLight = 'green';
    this.remainingTime = 10;

    // countdown 10 seconds
    this.interval = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
      }
    }, 1000);

    // after 10sec → resume auto if needed
    this.timer = setTimeout(() => {
      clearInterval(this.interval);
      this.emergencyActive = false;

      this.currentLight = 'red';
      this.autoMode = true;
      this.runSignal();
    }, 10000);
  }

 
  // MANUAL MODE

  changeLight() {
    if (this.currentLight === 'red') this.currentLight = 'yellow';
    else if (this.currentLight === 'yellow') this.currentLight = 'green';
    else this.currentLight = 'red';
  }

  // AUTO MODE
  
  autoMode = false;

  startAuto() {
    this.autoMode = true;
    this.runSignal();
  }

  stopAuto() {
    this.autoMode = false;

    clearTimeout(this.timer);
    clearInterval(this.interval);

    this.timer = null;
    this.interval = null;
  }

  runSignal() {
    if (!this.autoMode) return;

    let delay = 0;

    if (this.currentLight === 'red') delay = 10000;
    else if (this.currentLight === 'yellow') delay = 5000;
    else if (this.currentLight === 'green') delay = 7000;

    this.remainingTime = delay / 1000;

    // countdown
    this.interval = setInterval(() => {
      if (!this.autoMode) return;
      if (this.remainingTime > 0) this.remainingTime--;
    }, 1000);

    // switch lights
    this.timer = setTimeout(() => {
      clearInterval(this.interval);

      if (this.currentLight === 'red') this.currentLight = 'yellow';
      else if (this.currentLight === 'yellow') this.currentLight = 'green';
      else this.currentLight = 'red';

      this.runSignal();
    }, delay);
  }
}
