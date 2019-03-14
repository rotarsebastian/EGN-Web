import { Component, OnInit, AfterViewInit } from "@angular/core";
import { User } from "src/app/models/users.model";
import { MatDialog } from "@angular/material";
import { CreatePostDialogComponent } from "src/app/dialogs/createNewPost/createPost";
import { Router, NavigationEnd } from "@angular/router";
import { PostsService } from "src/app/services/posts.service";
import { Post } from "src/app/models/posts.model";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit, AfterViewInit {
  loggedUser: User;
  result: string;
  homePage: boolean = false;
  lastPost: Post;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private postsService: PostsService
  ) {}

  ngOnInit() {
    let currentUser = localStorage.getItem("currentUser");
    this.loggedUser = JSON.parse(currentUser);

    this.postsService.postsChanged.subscribe((posts: Post[]) => {
      if (!!posts) {
        this.lastPost = posts[posts.length - 1];
      }
    });
  }

  ngAfterViewInit() {
    this.router.events.forEach(event => {
      if (event instanceof NavigationEnd) {
        if (event["urlAfterRedirects"] === "/home") {
          this.homePage = true;
        } else {
          this.homePage = false;
        }
      }
    });
  }

  createPost(content: string) {
    const date = new Date();
    let newPostID: number;
    if (!!this.lastPost) {
      newPostID = this.lastPost.id + 1;
    } else {
      newPostID = 0;
    }
    const post = new Post(
      newPostID,
      this.loggedUser.name,
      this.loggedUser.position,
      this.loggedUser.company,
      date.toISOString(),
      content,
      [],
      []
    );
    console.log("Created " + post.id);

    this.postsService.createPost(post);
    this.postsService.storePosts().subscribe();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreatePostDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.result = result;
        this.createPost(result);
      }
    });
  }
}
