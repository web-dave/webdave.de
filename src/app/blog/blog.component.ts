import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../blog.service';

@Component({
  selector: 'blog-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  url: string;
  constructor(private route: ActivatedRoute, private service: BlogService) {}

  ngOnInit(): void {
    this.url = this.service.getPostUrl(this.route.snapshot.params['url']);
  }
}
