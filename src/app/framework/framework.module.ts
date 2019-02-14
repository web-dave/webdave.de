import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ImpressumComponent } from "./impressum/impressum.component";
import { StartComponent } from "./start/start.component";
import { MarkdownModule } from "ngx-markdown";
import { ContentComponent } from "./content/content.component";
import { BlogsService } from "./shared/blogs.service";
import { ShellComponent } from "./shell/shell.component";
import { LayoutModule } from "@angular/cdk/layout";
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
} from "@angular/material";
import { DSVGOComponent } from "./dsvgo/dsvgo.component";

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
    DSVGOComponent
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
