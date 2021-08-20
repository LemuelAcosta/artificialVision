import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecognitionPageRoutingModule } from './recognition-routing.module';

import { RecognitionPage } from './recognition.page';
import { CameraResultPageModule } from '../camera-result/camera-result.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecognitionPageRoutingModule,
    CameraResultPageModule
  ],
  declarations: [RecognitionPage]
})
export class RecognitionPageModule {}
