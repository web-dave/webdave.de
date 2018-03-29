import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class BlogsService {
  constructor(private http: HttpClient) {}

  getPostList() {
    return this.http.get<any>("assets/posts/posts.json");
  }
}
