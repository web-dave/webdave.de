import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FooterComponent } from "./footer/footer.component";
import { ImpressumComponent } from "./impressum/impressum.component";
import { StartComponent } from "./start/start.component";
import { NavComponent } from "./nav/nav.component";
import { MarkdownModule } from "ngx-markdown";
import { ContentComponent } from "./content/content.component";

@NgModule({
  imports: [CommonModule, MarkdownModule.forChild()],
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
  ]
})
export class FrameworkModule {}
