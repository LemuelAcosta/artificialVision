import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'recognition',
    loadChildren: () => import('./private/recognition/recognition.module').then( m => m.RecognitionPageModule)
  },  {
    path: 'camera-result',
    loadChildren: () => import('./private/camera-result/camera-result.module').then( m => m.CameraResultPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
