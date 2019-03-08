import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { Post } from "../../models/posts.model";
import { NgForm } from "@angular/forms";
import {
  trigger,
  state,
  style,
  transition,
  animate
} from "@angular/animations";
import { PostsService } from "src/app/services/posts.service";
import * as firebase from "firebase";
import { User } from "src/app/models/users.model";
import { Like } from "src/app/models/likes.model";
import { HtmlAstPath } from "@angular/compiler";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.scss"],
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
    ])
  ]
})
export class PostsComponent implements OnInit {
  @Input() post: Post;
  @Input() index: number;
  @ViewChild("likeButton") likePath: any;
  addCommentOpen: boolean = false;
  loggedUser: User;

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    let currentUser = localStorage.getItem("currentUser");
    this.loggedUser = JSON.parse(currentUser);

    for (let like of this.post.likes) {
      if (like.author === this.loggedUser.id) {
        this.likePath.nativeElement.classList.toggle("liked");
        this.likePath.nativeElement.nextSibling.classList.toggle("liked");
      }
    }
  }

  autogrow(event) {
    let textArea = event.srcElement;
    textArea.style.overflow = "hidden";
    textArea.style.height = "0px";
    textArea.style.height = textArea.scrollHeight + "px";
  }

  postComment(addCommentForm: NgForm) {
    const comment = addCommentForm.value.comment;
    const name = firebase.auth().currentUser.displayName;

    const newComment = {
      likes: 0,
      author: name,
      content: comment
    };
    this.post["comments"].push(newComment);
    this.postsService.storePosts().subscribe();
    addCommentForm.reset();
  }

  openAddComment() {
    this.onSeeComments(this.index);
  }

  onLikePost() {
    let newLike: Like = {
      author: this.loggedUser.id
    };

    let alreadyLiked: boolean = false;

    for (let like of this.post.likes) {
      if (like.author === this.loggedUser.id) {
        alreadyLiked = true;
      }
    }

    if (!alreadyLiked) {
      this.post.likes.push(newLike);
      this.likePath.nativeElement.classList.toggle("liked");
      this.likePath.nativeElement.nextSibling.classList.toggle("liked");
    } else {
      for (let like of this.post.likes) {
        if (like.author === this.loggedUser.id) {
          let likeIndex = this.post.likes.indexOf(like);
          this.post.likes.splice(likeIndex, 1);
          this.likePath.nativeElement.classList.toggle("liked");
          this.likePath.nativeElement.nextSibling.classList.toggle("liked");
        }
      }
    }

    this.postsService.storePosts().subscribe(response => {});
  }

  onSeeComments(index: number) {
    let path = document.querySelectorAll(".comment-svg-path");
    let pathArray = Array.from(path);
    pathArray[index].classList.toggle("commentsOpen");
    this.addCommentOpen = !this.addCommentOpen;
  }
}
