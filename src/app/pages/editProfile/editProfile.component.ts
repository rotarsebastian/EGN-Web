import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { User } from "src/app/models/users.model";
import { UtilsService } from "src/app/services/utils.service";

@Component({
  selector: "app-edit-profile",
  templateUrl: "./editProfile.component.html",
  styleUrls: ["./editProfile.component.scss"]
})
export class EditProfileComponent implements OnInit {
  loggedUser: User;
  uploadProfileImg: File;
  roles: any[];

  constructor(
    private router: Router,
    private location: Location,
    private utilsService: UtilsService
  ) {
    let currentUser = localStorage.getItem("currentUser");
    this.loggedUser = JSON.parse(currentUser);
  }

  ngOnInit() {}

  goBackToProfile() {
    this.location.back();
  }

  // profileChangeEvent(e) {
  //   const files = e.srcElement["files"];
  //   if (files.length > 0) {
  //     const filename = files[0].name;
  //     this.uploadProfileImg = new File([files[0]], filename, {
  //       type: files[0].type
  //     });
  //     const reader = new FileReader();
  //     const that = this;
  //     reader.onload = (event: any) => {
  //       that.loggedUser.profileImg = event.target["result"];
  //     };
  //     reader.readAsDataURL(this.uploadProfileImg);
  //   }
  // }

  isEmailValid(email: string) {
    return (
      email && email.trim().length > 0 && this.utilsService.validateEmail(email)
    );
  }

  isLinkedinLinkValid(text: string) {
    return (
      !text ||
      (text &&
        this.utilsService.validateLink(text) &&
        text.includes("linkedin"))
    );
  }

  isBtnDisabled() {
    return (
      !this.loggedUser.name ||
      this.loggedUser.name.trim().length === 0 ||
      !this.loggedUser.position ||
      this.loggedUser.position.trim().length === 0 ||
      !this.isEmailValid(this.loggedUser.email) ||
      !this.loggedUser.company ||
      this.loggedUser.company.trim().length === 0
    );
  }
}
