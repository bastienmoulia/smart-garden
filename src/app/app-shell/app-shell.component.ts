import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sg-app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class AppShellComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
