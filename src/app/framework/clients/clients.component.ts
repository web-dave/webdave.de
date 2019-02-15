import { Component, OnInit } from "@angular/core";
import { Breakpoints, BreakpointObserver } from "@angular/cdk/layout";
import { BlogsService } from "../shared/blogs.service";
import { Observable } from "rxjs";

@Component({
  selector: "blog-clients",
  templateUrl: "./clients.component.html",
  styleUrls: ["./clients.component.scss"]
})
export class ClientsComponent implements OnInit {
  clients$: Observable<string[]>;
  getImgUrl(client: string) {
    return `assets/images/clients/${client}`;
  }
  constructor(private service: BlogsService) {}
  ngOnInit() {
    this.clients$ = this.service.getClients();
  }
}
