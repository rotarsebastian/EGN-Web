import { Component, OnInit, Input, ViewChild } from "@angular/core";
import {
  trigger,
  state,
  style,
  transition,
  animate
} from "@angular/animations";
import { User } from "src/app/models/users.model";
import { PostsService } from "src/app/services/posts.service";
import { Post } from "src/app/models/posts.model";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-comments",
  templateUrl: "./comments.component.html",
  styleUrls: ["./comments.component.scss"],
  animations: [
    trigger("addCommentSlide", [
      state(
        "in",
        style({
          opacity: 1,
          transform: "translateY(0)"
        })
      ),
      transition("void => *", [
        style({
          opacity: 0,
          transform: "translateY(-100px)",
          transition: "0.25s ease"
        }),
        animate(200)
      ]),
      transition("* => void", [
        animate(
          200,
          style({
            transform: "translateY(-100px)",
            opacity: 0,
            transition: "0.25s ease"
          })
        )
      ])
    ]),
    trigger("onManage", [
      state(
        "in",
        style({
          opacity: 1,
          transform: "translateX(0)"
        })
      ),
      transition("void => *", [
        style({
          opacity: 0,
          transform: "translateX(50px)",
          transition: "0.25s ease"
        }),
        animate(200)
      ]),
      transition("* => void", [
        animate(
          200,
          style({
            transform: "translateX(50px)",
            opacity: 0,
            transition: "0.25s ease"
          })
        )
      ])
    ]),
    trigger("singlePost", [
      state(
        "in",
        style({
          opacity: 1,
          transform: "translateX(0)"
        })
      ),
      transition("void => *", [
        style({
          opacity: 0,
          transform: "translateY(150px)",
          transition: "0.25s ease"
        }),
        animate(200)
      ]),
      transition("* => void", [
        animate(
          200,
          style({
            transform: "translateX(100px)",
            opacity: 0
          })
        )
      ])
    ])
  ]
})
export class CommentsComponent implements OnInit {
  @Input() comment: Comment;
  @Input() indexComment: number;
  @Input() index: number;
  @Input() currentPost: Post;
  @Input() wrappedComments: boolean;
  @ViewChild("likeButton") likePath: any;
  areWrappedComments: boolean = false;
  readMoreComment: boolean = false;
  loggedUser: User;
  dropDownCommentOpen: boolean = false;
  commentEditable: boolean = false;
  commentReadIdentifier: string;

  constructor(
    private postsService: PostsService,
    private toastr: ToastrService
  ) {
    let currentUser = localStorage.getItem("currentUser");
    this.loggedUser = JSON.parse(currentUser);
  }

  ngOnInit() {
    if (!!this.wrappedComments) {
      this.areWrappedComments = this.wrappedComments;
    }
    this.commentReadIdentifier = `see${this.comment["id"]}`;
  }

  onManageComment() {
    if (this.dropDownCommentOpen && this.commentEditable) {
      this.onEditComment();
    }
    this.dropDownCommentOpen = !this.dropDownCommentOpen;
  }

  onEditComment() {
    this.commentEditable = !this.commentEditable;
    setTimeout(() => {
      let textAreaToEdit: any = document.querySelectorAll(
        ".edit-comment-textarea"
      );
      textAreaToEdit[this.indexComment].focus();
    }, 0);
  }

  changeComment(event) {
    const newComment = event.srcElement.parentElement.previousSibling.value.trim();
    this.comment["content"] = newComment;
    this.toastr.success("Your comment is now updated.");
    this.onEditComment();
    this.onManageComment();
    this.postsService.storePosts().subscribe();
  }

  deleteComment() {
    this.postsService.deletePostComment(
      this.currentPost.id,
      this.comment["id"]
    );
    this.toastr.success("Your comment has been deleted.");
    this.postsService.storePosts().subscribe(response => {});
  }

  seeMoreButton() {
    this.readMoreComment = !this.readMoreComment;
  }

  autogrow(event) {
    let textArea = event.srcElement;
    textArea.style.overflow = "hidden";
    textArea.style.height = "0px";
    textArea.style.height = textArea.scrollHeight + "px";
  }

  onClickedOutside() {
    if (this.dropDownCommentOpen) {
      this.onManageComment();
    }
  }
}
