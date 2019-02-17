import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "blog-client",
  templateUrl: "./client.component.html",
  styleUrls: ["./client.component.scss"]
})
export class ClientComponent implements OnInit {
  @Input() clientname: string;
  constructor() {}
  getImgUrl() {
    return `assets/images/clients/${this.clientname}`;
  }
  ngOnInit() {}
}
