import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { PostsService } from "src/app/services/posts.service";
import { NgModel } from "@angular/forms";
import { Post } from "src/app/models/posts.model";
import { User } from "src/app/models/users.model";

@Component({
  selector: "app-create-post",
  templateUrl: "./createPost.html",
  styleUrls: ["./createPost.scss"]
})
export class CreatePostDialogComponent {
  loggedUser: User;
  lastPost: Post;

  constructor(
    public dialogRef: MatDialogRef<CreatePostDialogComponent>,
    private postService: PostsService
  ) {
    let currentUser = localStorage.getItem("currentUser");
    this.loggedUser = JSON.parse(currentUser);
    this.postService.getPosts();
    this.postService.postsChanged.subscribe((posts: Post[]) => {
      this.lastPost = posts[posts.length - 1];
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createPost(content: NgModel) {
    const date = new Date();
    const post = new Post(
      this.lastPost.id + 1,
      this.loggedUser.name,
      this.loggedUser.position,
      this.loggedUser.company,
      date.toISOString(),
      content.value,
      [],
      []
    );
    this.postService.createPost(post);
    this.postService.storePosts().subscribe();
  }
}
