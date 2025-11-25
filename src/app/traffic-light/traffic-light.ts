import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-traffic-light',
  imports: [],
  templateUrl: './traffic-light.html',
  styleUrl: './traffic-light.scss',
})
export class TrafficLight {
   @Input() currentLight: string = 'red';
   
}
