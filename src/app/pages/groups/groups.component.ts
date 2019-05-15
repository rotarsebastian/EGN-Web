import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { PostsService } from "src/app/services/posts.service";
import { Post } from "src/app/models/posts.model";

@Component({
  selector: "app-groups",
  templateUrl: "./groups.component.html",
  styleUrls: ["./groups.component.scss"]
})
export class GroupsComponent implements OnInit {
  subscription: Subscription;
  posts: Post[];
  isWaiting: boolean;

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.isWaiting = false;
    this.getPosts();
  }

  getPosts() {
    this.isWaiting = true;
    this.postsService.getPosts();
    this.isWaiting = true;
    this.subscription = this.postsService.postsChanged.subscribe(
      (posts: Post[]) => {
        this.isWaiting = false;
        this.posts = posts;
      },
      err => {
        this.isWaiting = false;
      }
    );
  }
}
