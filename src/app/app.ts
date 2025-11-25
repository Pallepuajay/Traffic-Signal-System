import { Component, signal } from '@angular/core';
import { TrafficLight } from './traffic-light/traffic-light';
import { Controller } from './controller/controller';

@Component({
  selector: 'app-root',
  imports: [TrafficLight,Controller],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('task');
}
