import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FooterComponent } from "./footer/footer.component";
import { ImpressumComponent } from "./impressum/impressum.component";
import { StartComponent } from "./start/start.component";
import { NavComponent } from "./nav/nav.component";

@NgModule({
  imports: [CommonModule],
  declarations: [
    StartComponent,
    NavComponent,
    FooterComponent,
    ImpressumComponent
  ],
  exports: [StartComponent, NavComponent, FooterComponent, ImpressumComponent]
})
export class FrameworkModule {}
