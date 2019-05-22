import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { Post } from "src/app/models/posts.model";
import { PostsService } from "src/app/services/posts.service";

@Component({
  selector: "app-group-activity",
  templateUrl: "./groupActivity.component.html",
  styleUrls: ["./groupActivity.component.scss"]
})
export class GroupActivityComponent implements OnInit, OnDestroy {
  @Input("groupID") groupID: number;
  posts: Post[];
  isWaiting: boolean;
  subscription: Subscription;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private postsService: PostsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isWaiting = false;
    this.getPosts();
  }

  getPosts() {
    this.isWaiting = true;
    this.postsService.getPosts();
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

  ngOnDestroy() {}
}
