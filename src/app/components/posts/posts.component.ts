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
import { User } from "src/app/models/users.model";
import { Like } from "src/app/models/likes.model";

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
    ]),
    trigger("editPost", [
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
export class PostsComponent implements OnInit {
  @Input() post: Post;
  @Input() index: number;
  @ViewChild("likeButton") likePath: any;

  addCommentOpen: boolean = false;
  loggedUser: User;
  dropDownPostOpen: boolean = false;
  postEditable: boolean = false;

  constructor(private postsService: PostsService) {
    let currentUser = localStorage.getItem("currentUser");
    this.loggedUser = JSON.parse(currentUser);
  }

  //WRAP THE MESSAGES IN A VIEW X MORE COMMENTS BUTTON AND LEAVE ONLY 2 TO BE SHOWN

  ngOnInit() {
    if (this.post["likes"]) {
      for (let like of this.post.likes) {
        if (like.author === this.loggedUser.id) {
          this.likePath.nativeElement.classList.toggle("liked");
          this.likePath.nativeElement.nextSibling.classList.toggle("liked");
        }
      }
    }
  }

  seeDropDownPost() {
    this.dropDownPostOpen = !this.dropDownPostOpen;
  }

  deletePost(indexOfPost: number) {
    this.postsService.getPosts();
    this.postsService.postsChanged.subscribe((posts: Post[]) => {
      posts.splice(indexOfPost, 1);
    });

    this.postsService.deletePost(indexOfPost);
    this.postsService.storePosts().subscribe(response => {});
  }

  onEditPost() {
    this.postEditable = !this.postEditable;

    let editButton: HTMLElement = <HTMLElement>(
      document.querySelector(".svg-edit-post")
    );
    editButton.classList.toggle("svg-active");

    let regularMessage: HTMLElement = <HTMLElement>(
      document.querySelector(".regular-message")
    );
    regularMessage.classList.toggle("hide");

    let editableMessage: HTMLElement = <HTMLElement>(
      document.querySelector(".editable-message")
    );
    editableMessage.classList.toggle("hide");

    let textAreaToEdit: HTMLElement = <HTMLElement>(
      document.querySelector(".edit-post-textarea")
    );
    textAreaToEdit.focus();
  }

  changePost(event) {
    const newMessage = event.srcElement.parentElement.previousSibling.value;
    this.post.message = newMessage;
    this.onEditPost();
    this.seeDropDownPost();
    this.postsService.storePosts().subscribe();
  }

  seeMore() {
    let seeMoreDots: HTMLElement = <HTMLElement>(
      document.querySelector(".more-text-dots")
    );
    seeMoreDots.classList.toggle("hide");
  }

  autogrow(event) {
    let textArea = event.srcElement;
    textArea.style.overflow = "hidden";
    textArea.style.height = "0px";
    textArea.style.height = textArea.scrollHeight + "px";
  }

  postComment(addCommentForm: NgForm) {
    const comment = addCommentForm.value.comment;
    const name = this.loggedUser.name;
    const userID = this.loggedUser.id;

    const newComment = {
      likes: 0,
      author: name,
      authorID: userID,
      content: comment
    };
    this.post["comments"].push(newComment);
    this.postsService.storePosts().subscribe();
    addCommentForm.reset();
  }

  openAddComment() {
    this.onSeeComments(this.index);
    this.postsService.storePosts().subscribe(response => {});
  }

  onLikePost() {
    let newLike: Like = {
      author: this.loggedUser.id
    };

    let alreadyLiked: boolean = false;

    if (this.post["likes"]) {
      for (let like of this.post.likes) {
        if (like.author === this.loggedUser.id) {
          alreadyLiked = true;
        }
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
