import { Component } from '@angular/core';

@Component({
  selector: 'blog-dsvgo',
  template: `
    <mat-card class="example-card">
      <mat-card-content>
        <markdown [src]="url"></markdown>
      </mat-card-content>
    </mat-card>
  `
})
export class DSVGOComponent {
  url = `assets/content/dsvg.md`;
}
