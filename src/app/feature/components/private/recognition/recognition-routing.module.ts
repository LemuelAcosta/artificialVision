import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecognitionPage } from './recognition.page';

const routes: Routes = [
  {
    path: '',
    component: RecognitionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecognitionPageRoutingModule {}
