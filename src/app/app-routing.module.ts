import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { StartComponent } from "./framework/start/start.component";
import { ImpressumComponent } from "./framework/impressum/impressum.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/start",
    pathMatch: "full"
  },
  {
    path: "start",
    component: StartComponent
  },
  // {
  //   path: "start/clients",
  //   component: StartComponent
  // },
  {
    path: "impressum",
    component: ImpressumComponent
  },
  {
    path: "blog",
    loadChildren: "./blog/blog.module#BlogModule"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
