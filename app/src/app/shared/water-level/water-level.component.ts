import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'sg-water-level',
  templateUrl: './water-level.component.html',
  styleUrls: ['./water-level.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WaterLevelComponent implements OnInit {
  @Input() level: number;
  @Input() refresh: boolean;

  constructor() {}

  ngOnInit(): void {}
}
