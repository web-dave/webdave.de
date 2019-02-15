import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class BlogsService {
  constructor(private http: HttpClient) {}

  getPostList(): Observable<Post[]> {
    return this.http
      .get<PostsObj>("assets/posts/posts.json")
      .pipe(map(popj => popj.posts));
  }

  getClients(): Observable<string[]> {
    return this.http.get<string[]>("assets/content/clients.json");
  }

  getWorkshops(): Observable<any> {
    return this.http.get<any>("assets/content/workshops.json");
  }
}

interface PostsObj {
  posts: Post[];
}

export interface Post {
  url: string;
  name: string;
  title: string;
  preview: string;
}
