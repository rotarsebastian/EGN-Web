import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  OnChanges
} from "@angular/core";
import { User } from "src/app/models/users.model";
import { MatDialog } from "@angular/material";
import { CreatePostDialogComponent } from "src/app/dialogs/createNewPost/createPost";
import { Router, NavigationEnd } from "@angular/router";
import { PostsService } from "src/app/services/posts.service";
import { Post } from "src/app/models/posts.model";
import { ToastrService } from "ngx-toastr";
import { UsersService } from "src/app/services/users.service";
import { Subscription } from "rxjs";

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
  @ViewChild("topUserImg") topUserImg: any;
  public routerLinkVariable = "/user";
  subscription: Subscription;
  users: any;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private postsService: PostsService,
    private toastr: ToastrService,
    private userService: UsersService
  ) {}

  ngOnInit() {
    let currentUser = localStorage.getItem("currentUser");
    this.loggedUser = JSON.parse(currentUser);

    this.userService.getUsers();
    this.subscription = this.userService.usersChanged.subscribe(
      (users: User[]) => {
        this.users = users;
        for (let myUser of this.users) {
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

    if (this.loggedUser.imgPath != "unset") {
      this.topUserImg.nativeElement.style.backgroundImage = `url("${
        this.loggedUser.imgPath
      }")`;
    }
  }

  doLogout() {
    localStorage.clear();
    window.location.reload();
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
      this.loggedUser.id,
      this.loggedUser.name,
      this.loggedUser.imgPath,
      false,
      this.loggedUser.position,
      this.loggedUser.company,
      date.toISOString(),
      content,
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
        this.createPost(result);
      }
    });
  }
}
