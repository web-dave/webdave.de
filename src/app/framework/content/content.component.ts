import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'blog-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit, OnChanges {
  @Input() name: string;
  @Input() post: boolean;
  url: string;
  constructor() {}

  ngOnInit() {}
  ngOnChanges() {
    if (this.post) {
      this.url = `assets/posts/${this.name}.md`;
    } else {
      this.url = `assets/content/${this.name}.md`;
    }
  }
}
