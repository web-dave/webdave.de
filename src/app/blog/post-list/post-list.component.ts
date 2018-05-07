import { Component, OnInit, OnDestroy } from "@angular/core";
import { BlogsService, post } from "../../framework/shared/blogs.service";
import { Subscription } from "rxjs";

@Component({
  selector: "blog-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.scss"]
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: post[];
  postsSub: Subscription;
  constructor(private blogService: BlogsService) {}

  ngOnInit() {
    this.postsSub = this.blogService
      .getPostList()
      .subscribe(data => (this.posts = data.posts));
  }
  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
