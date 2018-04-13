import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class BlogsService {
  constructor(private http: HttpClient) {}

  getPostList() {
    return this.http.get<postsObj>("assets/posts/posts.json");
  }
}

interface postsObj {
  posts: post[];
}

export interface post {
  url: string;
  name: string;
  title: string;
  preview: string;
}
