import { Component, ViewChild, ViewChildren } from '@angular/core';

import {
  CropperSettings,
  ImageCropperComponent,
  CropPosition
} from 'ngx-img-cropper';

@Component({
  selector: 'blog-cropper',
  templateUrl: './cropper.component.html',
  styleUrls: ['./cropper.component.scss']
})
export class CropperComponent {
  // Cropper 1 data
  public data1: any;
  public cropperSettings1: CropperSettings;

  // Cropper 2 data
  public data2: any;
  public cropperSettings2: CropperSettings;

  @ViewChildren('img-cropper')
  public cropper: ImageCropperComponent[];

  // @ViewChild('cropper1', { static: true })
  // public cropper1: ImageCropperComponent;

  // @ViewChild('cropper2', { static: true })
  // public cropper2: ImageCropperComponent;

  // @ViewChild('cropper3', { static: true })
  // public cropper3: ImageCropperComponent;

  // @ViewChild('cropper4', { static: true })
  // public cropper4: ImageCropperComponent;

  public onChange: ($event: any) => void;
  public updateCropPosition: () => any;
  public resetCroppers: () => any;

  // Cropper 3 data
  public data3: any;
  public cropperSettings3: CropperSettings;
  public cropPosition: CropPosition;

  // Cropper 4 data
  public cropperSettings4: CropperSettings;

  public data4: any;
  public getImage: () => void;

  template1 = `
<img-cropper
    [image]="data1"
    [settings]="cropperSettings1"
  ></img-cropper>`;
  template2 = `
<img-cropper
    [image]="data2"
    [settings]="cropperSettings2"
></img-cropper>`;
  template3 = `
<img-cropper
    [image]="data3"
    [settings]="cropperSettings3"
    [(cropPosition)]="cropPosition"
></img-cropper>`;
  template4 = `
<img-cropper
    [image]="data4"
    [settings]="cropperSettings4"
></img-cropper>`;

  constructor() {
    const settings1 = {
      dynamicSizing: true,
      cropperClass: 'custom-class',
      croppingClass: 'cropping',
      width: 200,
      height: 200,
      croppedWidth: 200,
      croppedHeight: 200,
      canvasWidth: 500,
      canvasHeight: 300,
      minWidth: 100,
      minHeight: 100,
      rounded: false,
      cropperDrawSettings: {
        strokeColor: '#fff',
        trokeWidth: 2
      },
      keepAspect: true,
      preserveSize: false
    };
    this.cropperSettings1 = new CropperSettings(settings1);

    this.data1 = {};

    // Cropper settings 2
    const settings2 = {
      width: 200,
      height: 200,
      keepAspect: false,
      croppedWidth: 200,
      croppedHeight: 200,
      canvasWidth: 500,
      canvasHeight: 300,
      minWidth: 100,
      minHeight: 100,
      rounded: true,
      minWithRelativeToResolution: false,
      cropperDrawSettings: {
        strokeColor: '#fff',
        strokeWidth: 2
      },
      noFileInput: true,
      fileType: 'image/jpeg'
    };
    this.cropperSettings2 = new CropperSettings(settings2);

    this.data2 = {};

    // Cropper settings 3
    const settings3 = {
      width: 200,
      height: 250,
      keepAspect: true,
      croppedWidth: 200,
      croppedHeight: 250,
      canvasWidth: 500,
      canvasHeight: 300,
      minWidth: 100,
      minHeight: 100,
      rounded: false,
      preserveSize: true,
      minWithRelativeToResolution: false,
      cropperDrawSettings: {
        strokeColor: '#fff',
        strokeWidth: 2
      },
      noFileInput: false
    };

    this.cropperSettings3 = new CropperSettings(settings3);

    this.cropperSettings3.resampleFn = (buffer: HTMLCanvasElement) => {
      const canvasContext = buffer.getContext('2d');
      const imgW = buffer.width;
      const imgH = buffer.height;
      const imgPixels = canvasContext.getImageData(0, 0, imgW, imgH);

      for (let y = 0; y < imgPixels.height; y++) {
        for (let x = 0; x < imgPixels.width; x++) {
          const i = y * 4 * imgPixels.width + x * 4;
          const avg =
            (imgPixels.data[i] +
              imgPixels.data[i + 1] +
              imgPixels.data[i + 2]) /
            3;
          imgPixels.data[i] = avg;
          imgPixels.data[i + 1] = avg;
          imgPixels.data[i + 2] = avg;
        }
      }

      canvasContext.putImageData(
        imgPixels,
        0,
        0,
        0,
        0,
        imgPixels.width,
        imgPixels.height
      );
    };

    this.cropPosition = new CropPosition();
    this.cropPosition.x = 10;
    this.cropPosition.y = 10;
    this.cropPosition.w = 200;
    this.cropPosition.h = 250;

    this.data3 = {};

    // Cropper settings 4
    const settings4 = {
      width: 200,
      height: 200,
      croppedWidth: 200,
      croppedHeight: 200,
      canvasWidth: 500,
      canvasHeight: 300,
      minWidth: 100,
      minHeight: 100,
      rounded: false,
      cropperDrawSettings: {
        strokeColor: '#fff',
        strokeWidth: 2
      },
      keepAspect: true,
      preserveSize: true,
      cropOnResize: false
    };

    this.cropperSettings4 = new CropperSettings(settings4);

    this.data4 = {};

    this.getImage = () => {
      // this.data4.image = this.cropper4.cropper.getCroppedImage(true).src;
      this.data4.image = this.cropper[3].cropper.getCroppedImage(true).src;
    };

    this.onChange = ($event: any) => {
      const image: any = new Image();
      const file: File = $event.target.files[0];
      const myReader: FileReader = new FileReader();
      myReader.addEventListener('loadend', (loadEvent: any) => {
        image.src = loadEvent.target.result;
        // this.cropper2.setImage(image);
        this.cropper[1].setImage(image);
      });

      myReader.readAsDataURL(file);
    };

    this.updateCropPosition = () => {
      this.cropPosition = new CropPosition(
        this.cropPosition.x,
        this.cropPosition.y,
        this.cropPosition.w,
        this.cropPosition.h
      );
    };

    this.resetCroppers = () => {
      this.cropper.forEach(c => c.reset());
      // this.cropper1.reset();
      // this.cropper2.reset();
      // this.cropper3.reset();
      // this.cropper4.reset();
    };
  }
}
