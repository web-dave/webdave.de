import { Component, OnInit } from "@angular/core";
import { map } from "rxjs/operators";
import { Breakpoints, BreakpointObserver } from "@angular/cdk/layout";
import { BlogsService, post } from "../../framework/shared/blogs.service";
import { Observable } from "rxjs";

@Component({
  selector: "blog-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  posts$: Observable<post[]>;
  /** Based on the screen size, switch from standard to one column per row */
  // cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
  //   map(({ matches }) => {
  //     if (matches) {
  //       return [
  //         { title: "Card 1", cols: 1, rows: 1 },
  //         { title: "Card 2", cols: 1, rows: 1 },
  //         { title: "Card 3", cols: 1, rows: 1 },
  //         { title: "Card 4", cols: 1, rows: 1 }
  //       ];
  //     }

  //     return [
  //       { title: "Card 1", cols: 2, rows: 1 },
  //       { title: "Card 2", cols: 1, rows: 1 },
  //       { title: "Card 3", cols: 1, rows: 2 },
  //       { title: "Card 4", cols: 1, rows: 1 }
  //     ];
  //   })
  // );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private blogService: BlogsService
  ) {}
  ngOnInit(): void {
    this.posts$ = this.blogService.getPostList();
  }
}
