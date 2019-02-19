import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatTabsModule,
  MatExpansionModule,
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  MatToolbarModule
} from '@angular/material';

import { CropperRoutingModule } from './cropper-routing.module';
import { CropperComponent } from './cropper.component';
import { ImageCropperModule } from 'ngx-img-cropper';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CropperComponent],
  imports: [
    CommonModule,
    CropperRoutingModule,
    ImageCropperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    FormsModule
  ]
})
export class CropperModule {}
