import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CameraResultPageRoutingModule } from './camera-result-routing.module';

import { CameraResultPage } from './camera-result.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CameraResultPageRoutingModule,
    SharedModule
  ],
  declarations: [CameraResultPage]
})
export class CameraResultPageModule {}
