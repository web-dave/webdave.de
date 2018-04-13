import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FooterComponent } from "./footer/footer.component";
import { ImpressumComponent } from "./impressum/impressum.component";
import { StartComponent } from "./start/start.component";
import { NavComponent } from "./nav/nav.component";
import { MarkdownModule } from "ngx-markdown";
import { ContentComponent } from "./content/content.component";
import { BlogsService } from "./shared/blogs.service";

@NgModule({
  imports: [CommonModule, MarkdownModule.forChild(), RouterModule.forChild([])],
  declarations: [
    StartComponent,
    NavComponent,
    FooterComponent,
    ImpressumComponent,
    ContentComponent
  ],
  exports: [
    StartComponent,
    NavComponent,
    FooterComponent,
    ImpressumComponent,
    ContentComponent
  ],
  providers: [BlogsService]
})
export class FrameworkModule {}