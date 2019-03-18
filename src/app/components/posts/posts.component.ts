import {
  Component,
  OnInit,
  Input,
  ViewChild,
  AfterViewInit
} from "@angular/core";
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
export class PostsComponent implements OnInit, AfterViewInit {
  @Input() post: Post;
  @Input() index: number;
  @ViewChild("likeButton") likePath: any;
  @ViewChild("postUserImg") postUserImg: any;
  posts: Post[];

  addCommentOpen: boolean = false;
  seeMoreText: boolean = false;
  loggedUser: User;
  dropDownPostOpen: boolean = false;
  postEditable: boolean = false;
  commentsWrappable: boolean = false;
  neverShowMoreComments: boolean = false;
  wrappedCommentsAmount: number = -1;
  commentsToBeShown: any;
  initialHight: boolean = false;

  constructor(private postsService: PostsService) {
    let currentUser = localStorage.getItem("currentUser");
    this.loggedUser = JSON.parse(currentUser);
  }

  ngOnInit() {
    if (this.post["likes"]) {
      for (let like of this.post.likes) {
        if (like.author === this.loggedUser.id) {
          this.likePath.nativeElement.classList.toggle("liked");
          this.likePath.nativeElement.nextSibling.classList.toggle("liked");
        }
      }
    }

    console.log("Loaded " + this.post.id);
  }

  ngAfterViewInit() {
    if (this.post.authorImgPath != "unset") {
      this.postUserImg.nativeElement.style.backgroundImage = `url("${
        this.post.authorImgPath
      }")`;
    }
  }

  seeMoreComments(event) {
    if (this.commentsWrappable) {
      event.srcElement.textContent = `Hide first ${
        this.wrappedCommentsAmount
      } comments`;
    } else {
      event.srcElement.textContent = `See ${
        this.wrappedCommentsAmount
      } more comments`;
    }
    this.commentsWrappable = !this.commentsWrappable;
  }

  onClickedOutside() {
    if (this.addCommentOpen) {
      this.onSeeComments();
    }
    if (this.dropDownPostOpen) {
      this.seeDropDownPost();
    }
  }

  onClickedOutsideContent() {
    if (this.dropDownPostOpen) {
      this.seeDropDownPost();
    }
  }

  onSeeComments() {
    if (this.post["comments"].length > 5) {
      this.commentsWrappable = !this.commentsWrappable;
      this.commentsToBeShown = this.post["comments"].slice(
        this.post["comments"].length - 3
      );
      this.wrappedCommentsAmount = this.post["comments"].length - 3;
    }

    let path = document.querySelectorAll(".comment-svg-path");
    let pathArray = Array.from(path);
    pathArray[this.index].classList.toggle("commentsOpen");

    this.addCommentOpen = !this.addCommentOpen;
    if (this.addCommentOpen) {
      setTimeout(() => {
        let textAreaToEdit: any = document.querySelector("#newCommentTextarea");
        textAreaToEdit.focus();
        textAreaToEdit.scrollIntoView({ block: "start", behavior: "smooth" });
      }, 50);
    } else {
      let postTop: any = document.querySelectorAll(".entire-post");
      postTop[this.index].scrollIntoView({
        block: "start",
        behavior: "smooth"
      });
    }

    if (this.dropDownPostOpen) {
      this.dropDownPostOpen = !this.dropDownPostOpen;
    }
  }

  seeDropDownPost() {
    if (this.dropDownPostOpen && this.postEditable) {
      this.onEditPost();
    }

    if (this.addCommentOpen) {
      this.addCommentOpen = !this.addCommentOpen;
    }

    this.dropDownPostOpen = !this.dropDownPostOpen;
  }

  onEditPost() {
    this.postEditable = !this.postEditable;
    setTimeout(() => {
      let textAreaToEdit: any = document.querySelectorAll(
        ".edit-post-textarea"
      );
      textAreaToEdit[this.index].focus();
    }, 0);
  }

  deletePost() {
    console.log("Deleted " + this.post.id);
    this.postsService.deletePost(this.post.id);
    this.postsService.storePosts().subscribe();
  }

  changePost(event) {
    const newMessage = event.srcElement.parentElement.previousSibling.value.trim();
    this.post.message = newMessage;
    this.onEditPost();
    this.seeDropDownPost();
    this.postsService.storePosts().subscribe();
  }

  seeMoreButton() {
    this.seeMoreText = !this.seeMoreText;
  }

  autogrow(event) {
    let textArea = event.srcElement;
    textArea.style.overflow = "hidden";
    textArea.style.height = "0px";
    textArea.style.height = textArea.scrollHeight + "px";
  }

  postComment(addCommentForm: NgForm, event: any) {
    const comment = addCommentForm.value.comment;
    const name = this.loggedUser.name;
    const userID = this.loggedUser.id;
    let commentID: number;
    if (!!this.post.comments[this.post.comments.length - 1]) {
      commentID = this.post.comments[this.post.comments.length - 1].id + 1;
    } else {
      commentID = 0;
    }

    const newComment = {
      id: commentID,
      author: name,
      authorID: userID,
      content: comment
    };

    this.post["comments"].push(newComment);

    if (this.post["comments"].length === 6) {
      this.neverShowMoreComments = true;
    }

    if (this.commentsToBeShown && this.commentsToBeShown.length > -1) {
      this.commentsToBeShown.push(newComment);
    }

    event.srcElement.firstChild.style.height = "";

    this.postsService.storePosts().subscribe();
    addCommentForm.reset();
  }

  openAddComment() {
    this.onSeeComments();
    this.postsService.storePosts().subscribe();
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

    this.postsService.storePosts().subscribe();
  }
}
