import { Component, OnInit, Output } from "@angular/core";
import { PostsService } from "src/app/services/posts.service";
import { Subscription } from "rxjs";
import { Post } from "src/app/models/posts.model";

@Component({
  selector: "app-home-page",
  templateUrl: "./homePage.component.html",
  styleUrls: ["./homePage.component.scss"]
})
export class HomePageComponent implements OnInit {
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
