import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ImpressumComponent } from './impressum/impressum.component';
import { StartComponent } from './start/start.component';
import { ContentComponent } from './content/content.component';
import { ShellComponent } from './shell/shell.component';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatChipsModule,
  MatSnackBarModule
} from '@angular/material';
import { DSVGOComponent } from './dsvgo/dsvgo.component';
import { TitlePipe } from './title.pipe';
import { ClientsComponent } from './clients/clients.component';
import { ClientCarouselComponent } from './client-carousel/client-carousel.component';
import { ClientComponent } from './client/client.component';
import { MarkdownModule } from '../../../projects/ngx-markdown/src/public-api';

@NgModule({
  imports: [
    CommonModule,
    MarkdownModule.forChild(),
    RouterModule.forChild([]),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatChipsModule,
    MatSnackBarModule
  ],
  declarations: [
    StartComponent,
    ImpressumComponent,
    ContentComponent,
    ShellComponent,
    DSVGOComponent,
    TitlePipe,
    ClientsComponent,
    ClientCarouselComponent,
    ClientComponent
  ],
  exports: [
    ShellComponent,
    StartComponent,
    ImpressumComponent,
    ContentComponent
  ],
  entryComponents: [DSVGOComponent]
})
export class FrameworkModule {}
