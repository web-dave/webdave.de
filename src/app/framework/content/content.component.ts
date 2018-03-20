import { Component, OnInit, Input, OnChanges } from "@angular/core";

@Component({
  selector: "blog-content",
  templateUrl: "./content.component.html",
  styleUrls: ["./content.component.scss"]
})
export class ContentComponent implements OnInit, OnChanges {
  @Input() name: string;
  url: string;
  constructor() {}

  ngOnInit() {}
  ngOnChanges() {
    this.url = `assets/posts/${this.name}.md`;
  }
}
