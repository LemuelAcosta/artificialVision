import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecognitionPageRoutingModule } from './recognition-routing.module';

import { RecognitionPage } from './recognition.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecognitionPageRoutingModule
  ],
  declarations: [RecognitionPage]
})
export class RecognitionPageModule {}
