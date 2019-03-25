import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"]
})
export class UserComponent {
  loggedUser: any;
  public routerLinkVariable = "/user/edit";

  constructor(private router: Router) {
    let currentUser = localStorage.getItem("currentUser");
    this.loggedUser = JSON.parse(currentUser);
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
