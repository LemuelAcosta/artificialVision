import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GesturePipe } from '../core/pipes/gestures/gesture.pipe';



@NgModule({
  declarations: [
    GesturePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    GesturePipe
  ]
})
export class SharedModule { }
