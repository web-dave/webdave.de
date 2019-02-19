import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CropperComponent } from './cropper.component';

const routes: Routes = [{ path: '', component: CropperComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CropperRoutingModule {}
