import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { HttpClient, HttpRequest } from "@angular/common/http";
import { Post } from "../models/posts.model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class PostsService {
  constructor(private http: HttpClient) {}
  postsChanged = new Subject<Post[]>();
  private posts = [];
  path = "../assets/json/posts.json";
  pathFull = "https://egn-project.firebaseio.com/posts.json";

  storePosts() {
    const req = new HttpRequest("PUT", this.pathFull, this.posts, {
      reportProgress: true
    });
    return this.http.request(req);
  }

  getPosts() {
    this.http
      .get<Post[]>(this.pathFull, {
        observe: "body",
        responseType: "json"
      })
      .pipe(
        map(posts => {
          for (let post of posts) {
            if (!post["likes"]) {
              post["likes"] = [];
            }
          }
          return posts;
        })
      )
      .subscribe((posts: Post[]) => {
        this.setPosts(posts);
      });
  }

  setPosts(posts: Post[]) {
    this.posts = posts;
    this.postsChanged.next(this.posts.slice());
  }

  getPost(index: number) {
    return this.posts[index];
  }

  deletePost(index: number) {
    this.posts.splice(index, 1);
  }
}
