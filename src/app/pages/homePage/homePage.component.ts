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
  isWaiting: boolean = false;
  users: any;

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.posts = [];
    this.users = [];
    this.getPosts();
  }

  getPosts() {
    this.isWaiting = true;
    this.postsService.getPosts();
    this.subscription = this.postsService.postsChanged.subscribe(
      (posts: Post[]) => {
        this.posts = posts;
        this.isWaiting = false;
      },
      err => {
        this.isWaiting = false;
      }
    );
  }
}
