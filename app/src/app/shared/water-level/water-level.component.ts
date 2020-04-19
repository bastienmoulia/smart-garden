import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sg-water-level',
  templateUrl: './water-level.component.html',
  styleUrls: ['./water-level.component.scss'],
})
export class WaterLevelComponent implements OnInit {
  @Input() level: number;
  @Input() refresh: boolean;

  constructor() {}

  ngOnInit(): void {}
}
