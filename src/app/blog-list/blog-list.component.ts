import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogService, Post } from '../blog.service';

@Component({
  selector: 'blog-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
})
export class BlogListComponent implements OnInit {
  bloglist: Observable<Post[]>;
  constructor(private service: BlogService) {}

  ngOnInit(): void {
    this.bloglist = this.service.getPostList();
  }
}
