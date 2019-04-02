import { Component, OnInit } from '@angular/core';
import { BlogsService, Post } from '../../framework/shared/blogs.service';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { postsArray } from './posts';

@Component({
  selector: 'blog-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  posts: Post[] = [];
  constructor(
    private blogService: BlogsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.posts = postsArray.sort((a, b) =>
      a.timestamp > b.timestamp ? -1 : b.timestamp > a.timestamp ? 1 : 0
    );
  }
  showMore(name: string) {
    this.router.navigate([name], { relativeTo: this.route });
  }
}
