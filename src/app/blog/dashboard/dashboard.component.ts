import { Component, OnInit } from "@angular/core";
import { BreakpointObserver } from "@angular/cdk/layout";
import { BlogsService, Post } from "../../framework/shared/blogs.service";
import { Observable } from "rxjs";

@Component({
  selector: "blog-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  posts$: Observable<Post[]>;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private blogService: BlogsService
  ) {}
  ngOnInit(): void {
    this.posts$ = this.blogService.getPostList();
  }
}
