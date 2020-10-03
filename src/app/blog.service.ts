import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BlogService {
  private repo = 'https://raw.githubusercontent.com/web-dave/blog/master/';
  constructor(private http: HttpClient) {}

  getPostList(): Observable<Post[]> {
    return this.http.get<Post[]>(this.repo + 'posts.json');
  }
  getPostUrl(name: string): string {
    return this.repo + name + '.md';
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
  timestamp: number;
}

export interface IWorkshop {
  duration: string;
  targetgroup: string;
  title: string;
  topics: string[];
}
