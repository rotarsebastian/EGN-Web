import { Component, OnInit, Input } from "@angular/core";
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
  addCommentOpen: boolean = false;

  constructor(private postsService: PostsService) {}

  ngOnInit() {}

  autogrow(event) {
    let textArea = event.srcElement;
    textArea.style.overflow = "hidden";
    textArea.style.height = "0px";
    textArea.style.height = textArea.scrollHeight + "px";
  }

  postComment(addCommentForm: NgForm) {
    const comment = addCommentForm.value.comment;
    const newComment = {
      likes: 0,
      author: "Sebastian Rotar",
      content: comment
    };
    this.post["comments"].push(newComment);

    // this.postsService.storePosts().subscribe(response => {
    //   console.log(response);
    // });

    addCommentForm.reset();
  }

  openAddComment(index: number) {
    this.onSeeComments(index);
  }

  onLikePost(index: number) {
    let path = document.querySelectorAll(".like-svg-path");
    let pathArray = Array.from(path);
    let addLike: boolean = false;
    for (let pathElement of pathArray) {
      if (parseInt(pathElement.id) === index) {
        pathElement.classList.toggle("liked");
        if (pathElement.classList.contains("liked")) {
          addLike = true;
        } else {
          addLike = false;
        }
      }
    }

    if (addLike) {
      this.post.likes++;
    } else {
      this.post.likes--;
    }
  }

  onSeeComments(index: number) {
    let path = document.querySelectorAll(".comment-svg-path");
    let pathArray = Array.from(path);
    pathArray[index].classList.toggle("commentsOpen");
    this.addCommentOpen = !this.addCommentOpen;
  }
}
