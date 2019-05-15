import { Component, OnInit, AfterViewInit } from "@angular/core";
import { User } from "src/app/models/users.model";
import { MatDialog } from "@angular/material";
import { CreatePostDialogComponent } from "src/app/dialogs/createNewPost/createPost";
import { Router, NavigationEnd } from "@angular/router";
import { PostsService } from "src/app/services/posts.service";
import { Post } from "src/app/models/posts.model";
import { ToastrService } from "ngx-toastr";
import { UsersService } from "src/app/services/users.service";
import { Subscription } from "rxjs";
import { v4 as uuid } from "uuid";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit, AfterViewInit {
  loggedUser: User;
  result: string;
  homePage: boolean = true;
  lastPost: Post;
  public routerLinkVariable = "/user";
  subscription: Subscription;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private postsService: PostsService,
    private toastr: ToastrService,
    private userService: UsersService
  ) {
    let currentUser = localStorage.getItem("currentUser");
    this.loggedUser = JSON.parse(currentUser);
  }

  ngOnInit() {
    this.userService.getUsers();
    this.subscription = this.userService.usersChanged.subscribe(
      (users: User[]) => {
        for (let myUser of users) {
          if (myUser.id === this.loggedUser.id) {
            this.loggedUser = myUser;
          }
        }
      }
    );

    this.postsService.postsChanged.subscribe((posts: Post[]) => {
      if (!!posts) {
        this.lastPost = posts[posts.length - 1];
      }
    });
  }

  getProfileImage() {
    return this.loggedUser.imgPath !== "unset"
      ? `url(${this.loggedUser.imgPath})`
      : `url(/assets/images/standardProfile.svg)`;
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

  doLogout() {
    localStorage.clear();
    window.location.reload();
  }

  createPost(content: string, groupNames: Array<String>) {
    const date = new Date();

    const post = new Post(
      uuid(),
      this.loggedUser.id,
      this.loggedUser.name,
      this.loggedUser.imgPath,
      false,
      this.loggedUser.position,
      this.loggedUser.company,
      date.toISOString(),
      content,
      groupNames,
      [],
      []
    );
    console.log("Created " + post.id);

    this.toastr.success("Your post has been created.");

    this.postsService.createPost(post);
    this.postsService.storePosts().subscribe();
    setTimeout(() => {
      let textAreaToEdit: any = document.getElementById("posts-top");
      textAreaToEdit.scrollIntoView({
        block: "start",
        inline: "nearest",
        behavior: "smooth"
      });
    }, 100);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreatePostDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.result = result;
        this.createPost(result.postMessage, result.groupNames);
      }
    });
  }
}
