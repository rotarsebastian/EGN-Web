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

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.postsService.getPosts();
    this.subscription = this.postsService.postsChanged.subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      }
    );
  }
}
