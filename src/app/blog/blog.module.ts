import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BlogRoutingModule } from "./blog-routing.module";
import { PostListComponent } from "./post-list/post-list.component";
import { PostComponent } from "./post/post.component";
import { BlogComponent } from "./blog/blog.component";
import { MarkdownModule } from "ngx-markdown";
import { PreviewComponent } from './preview/preview.component';

@NgModule({
  imports: [CommonModule, BlogRoutingModule, MarkdownModule.forChild()],
  declarations: [PostListComponent, PostComponent, BlogComponent, PreviewComponent]
})
export class BlogModule {}
