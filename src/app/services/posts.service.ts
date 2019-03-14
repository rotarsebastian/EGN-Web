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
            if (!post["comments"]) {
              post["comments"] = [];
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

  createPost(post: Post) {
    this.posts.push(post);
    this.postsChanged.next(this.posts.slice());
  }

  deletePost(postID: number) {
    for (let post of this.posts) {
      if (post.id === postID) {
        const postIndex = this.posts.indexOf(post);
        this.posts.splice(postIndex, 1);
      }
    }
    this.postsChanged.next(this.posts.slice());
  }

  deletePostComment(postID: number, commentID: number) {
    for (let post of this.posts) {
      if (post.id === postID) {
        for (let comment of post.comments) {
          if (comment.id === commentID) {
            const commentIndex = post.comments.indexOf(comment);
            post.comments.splice(commentIndex, 1);
          }
        }
      }
    }
  }
}
