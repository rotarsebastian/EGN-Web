import { Component, OnInit, Output } from "@angular/core";
import { PostsService } from "src/app/services/posts.service";
import { Subscription } from "rxjs";
import { Post } from "src/app/models/posts.model";
import { UsersService } from "src/app/services/users.service";
import { User } from "src/app/models/users.model";

@Component({
  selector: "app-home-page",
  templateUrl: "./homePage.component.html",
  styleUrls: ["./homePage.component.scss"]
})
export class HomePageComponent implements OnInit {
  subscription: Subscription;
  posts: Post[];
  isWaiting: boolean;
  loggedUser: any;

  constructor(
    private postsService: PostsService,
    private userService: UsersService
  ) {
    let currentUser = localStorage.getItem("currentUser");
    this.loggedUser = JSON.parse(currentUser);
  }

  ngOnInit() {
    this.posts = [];
    this.isWaiting = false;
    this.userService.getUsers();
    this.userService.usersChanged.subscribe((users: User[]) => {
      for (let user of users) {
        if (this.loggedUser.id === user.id) {
          this.userService.setCurrentUser(user);
        }
      }
    });
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
