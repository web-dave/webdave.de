import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable()
export class BlogsService {
  constructor(private http: HttpClient) {}

  getPostList(): Observable<post[]> {
    return this.http
      .get<postsObj>("assets/posts/posts.json")
      .pipe(map(popj => popj.posts));
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
