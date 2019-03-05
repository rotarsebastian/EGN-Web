import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  trigger,
  state,
  style,
  transition,
  animate
} from "@angular/animations";
import { NgForm } from "@angular/forms";
import { formArrayNameProvider } from "@angular/forms/src/directives/reactive_directives/form_group_name";

@Component({
  selector: "app-home-page",
  templateUrl: "./homePage.component.html",
  styleUrls: ["./homePage.component.scss"],
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
export class HomePageComponent {
  addComment: boolean = false;
  chefText: string =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  constructor(private route: ActivatedRoute) {}

  openAddComment() {
    this.addComment = !this.addComment;
  }

  autogrow() {
    let textArea = document.getElementById("newCommentTextarea");
    textArea.style.overflow = "hidden";
    textArea.style.height = "0px";
    textArea.style.height = textArea.scrollHeight + "px";
  }

  postComment(addCommentForm: NgForm) {
    addCommentForm.reset();
  }
}
