import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UsersService } from "src/app/services/users.service";
import { User } from "src/app/models/users.model";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"]
})
export class UserComponent implements OnInit {
  loggedUser: any;
  public routerLinkVariable = "/user/edit";

  constructor(private router: Router, private userService: UsersService) {
    let currentUser = localStorage.getItem("currentUser");
    this.loggedUser = JSON.parse(currentUser);
  }

  ngOnInit() {
    this.userService.getUsers();
    this.userService.usersChanged.subscribe((users: User[]) => {
      for (let myUser of users) {
        if (myUser.id === this.loggedUser.id) {
          this.loggedUser = myUser;
        }
      }
    });
  }

  goToEditProfile() {
    this.router.navigate(["/user/edit", this.loggedUser.id]);
  }

  openLinkedin() {
    window.open(this.loggedUser.linkedInProfile);
  }

  getProfileImage() {
    return this.loggedUser.imgPath !== "unset"
      ? `url(${this.loggedUser.imgPath})`
      : `url(/assets/images/standardProfile.svg)`;
  }
}
