import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PostListComponent } from "./post-list/post-list.component";
import { PostComponent } from "./post/post.component";
import { BlogComponent } from "./blog/blog.component";

const routes: Routes = [
  {
    path: "",
    component: PostListComponent
  },
  {
    path: ":name",
    component: PostComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule {}
