import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { Post } from "src/app/models/posts.model";
import { PostsService } from "src/app/services/posts.service";
import { MatDialog } from "@angular/material";
import { CreatePostDialogComponent } from "src/app/dialogs/createNewPost/createPost";
import { ToastrService } from "ngx-toastr";
import { v4 as uuid } from "uuid";

@Component({
  selector: "app-group-activity",
  templateUrl: "./groupActivity.component.html",
  styleUrls: ["./groupActivity.component.scss"]
})
export class GroupActivityComponent implements OnInit, OnDestroy {
  @Input("groupID") groupID: number;
  @Input("groupName") groupName: String;
  posts: Post[];
  isWaiting: boolean;
  subscription: Subscription;
  noTags: boolean = true;
  loggedUser: any;

  constructor(
    private postsService: PostsService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {
    let currentUser = localStorage.getItem("currentUser");
    this.loggedUser = JSON.parse(currentUser);
  }

  ngOnInit() {
    this.isWaiting = false;

    this.getPosts();
  }

  getPosts() {
    this.postsService.getPosts();
    this.isWaiting = true;
    this.subscription = this.postsService.postsChanged.subscribe(
      (posts: Post[]) => {
        this.posts = [];
        this.isWaiting = false;
        let postToShow: boolean = false;
        for (let onePost of posts) {
          if (onePost.groupIDs) {
            for (let oneGroupID of onePost.groupIDs) {
              if (oneGroupID === this.groupID) {
                postToShow = true;
              }
            }
          }
          if (postToShow) {
            this.posts.push(onePost);
          }
          postToShow = false;
        }
      },
      err => {
        this.isWaiting = false;
      }
    );
  }

  getProfileImage() {
    return this.loggedUser.imgPath !== "unset"
      ? `url(${this.loggedUser.imgPath})`
      : `url(/assets/images/standardProfile.svg)`;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreatePostDialogComponent, {
      data: {
        noGroups: true,
        groupName: `${this.groupName} group`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.createPost(result.postMessage);
      }
    });
  }

  createPost(content: string) {
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
      [this.groupID],
      [`${this.groupName} group`],
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

  ngOnDestroy() {}
}
