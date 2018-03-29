import { Component, OnInit } from "@angular/core";
import { BlogsService } from "../shared/blogs.service";

@Component({
  selector: "blog-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"]
})
export class NavComponent implements OnInit {
  posts: string[];
  constructor(private blogService: BlogsService) {}

  ngOnInit() {
    this.blogService.getPostList().subscribe(list => (this.posts = list.posts));
  }
}
