import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaterLevelComponent } from './water-level/water-level.component';



@NgModule({
  declarations: [WaterLevelComponent],
  imports: [
    CommonModule
  ],
  exports: [WaterLevelComponent]
})
export class SharedModule { }
