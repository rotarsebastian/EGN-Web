import { Component } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { PostsService } from "src/app/services/posts.service";
import { User } from "src/app/models/users.model";
import { Router } from "@angular/router";
//import { MatDialog } from "@angular/material";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"]
})
export class UserComponent {
  loggedUser: User;
  public routerLinkVariable = "/user/edit";

  constructor(
    private postsService: PostsService,
    private toastr: ToastrService,
    private router: Router
  ) {
    let currentUser = localStorage.getItem("currentUser");
    this.loggedUser = JSON.parse(currentUser);
  }

  goToEditProfile() {
    this.router.navigate(["/user/edit", this.loggedUser.id]);
  }
}
