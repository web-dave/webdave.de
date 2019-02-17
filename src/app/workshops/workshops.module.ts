import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { WorkshopsRoutingModule } from "./workshops-routing.module";
import { WorkshopsComponent } from "./workshops.component";
import {
  MatExpansionModule,
  MatIconModule,
  MatListModule,
  MatButtonModule,
  MatCardModule
} from "@angular/material";
import { WorkshopDetailsComponent } from "./workshop-details/workshop-details.component";

@NgModule({
  declarations: [WorkshopsComponent, WorkshopDetailsComponent],
  imports: [
    CommonModule,
    WorkshopsRoutingModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class WorkshopsModule {}
