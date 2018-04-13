import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { post } from "../../framework/shared/blogs.service";

@Component({
  selector: "blog-preview",
  templateUrl: "./preview.component.html",
  styleUrls: ["./preview.component.scss"]
})
export class PreviewComponent implements OnInit, OnChanges {
  @Input() post: post;
  preview: string;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.post.currentValue) {
      this.preview = this.post.preview;
    }
  }

  constructor() {}

  ngOnInit() {}
}
