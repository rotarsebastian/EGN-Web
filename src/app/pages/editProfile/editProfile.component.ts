import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { Location } from "@angular/common";
import { UtilsService } from "src/app/services/utils.service";
import { MatDialog } from "@angular/material";
import { ChangePasswordDialogComponent } from "src/app/dialogs/changePassword/changePassword";
import { ToastrService } from "ngx-toastr";
import { UsersService } from "src/app/services/users.service";
import { User } from "src/app/models/users.model";
import { AuthService } from "src/app/services/auth.service";
import { QuestionDialogComponent } from "src/app/dialogs/question/question";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-edit-profile",
  templateUrl: "./editProfile.component.html",
  styleUrls: ["./editProfile.component.scss"]
})
export class EditProfileComponent implements OnInit, AfterViewInit {
  loggedUser: any;
  uploadProfileImg: File;
  roles: any[];
  users: any;
  initialUser: any;
  @ViewChild("userImage") userImage: any;

  constructor(
    private dialog: MatDialog,
    private toastr: ToastrService,
    private location: Location,
    private userService: UsersService,
    private authService: AuthService,
    private utilsService: UtilsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    let currentUser = localStorage.getItem("currentUser");
    this.initialUser = JSON.parse(currentUser);
    this.loggedUser = JSON.parse(currentUser);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    if (this.loggedUser.imgPath != "unset") {
      this.userImage.nativeElement.style.backgroundImage = `url("${
        this.loggedUser.imgPath
      }")`;
    }

    this.userService.getUsers();
    this.userService.usersChanged.subscribe((users: User[]) => {
      this.users = users;
    });
  }

  goBackToProfile() {
    this.location.back();
  }

  getProfileImage() {
    return this.loggedUser.imgPath ? `url(${this.loggedUser.imgPath})` : "";
  }

  profileChangeEvent(e) {
    const files = e.srcElement["files"];
    if (files.length > 0) {
      const filename = files[0].name;
      this.uploadProfileImg = new File([files[0]], filename, {
        type: files[0].type
      });
      const reader = new FileReader();
      const that = this;
      reader.onload = (event: any) => {
        that.loggedUser.imgPath = event.target["result"];
      };
      reader.readAsDataURL(this.uploadProfileImg);
    }
  }

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

  openDeleteProfileDialog() {
    const dialogRef = this.dialog.open(QuestionDialogComponent, {
      width: "600px",
      data: {
        title: "Delete profile",
        description:
          "Are you sure you want to delete your profile ? This change is irreversible."
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(this.loggedUser.id);
        this.authService.deleteUser();
        localStorage.clear();
      }
    });
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

  autogrow(event) {
    let textArea = event.srcElement;
    textArea.style.overflow = "hidden";
    textArea.style.height = "0px";
    textArea.style.height = textArea.scrollHeight + "px";
  }

  removeUnchangedProperties() {
    const tempUser = { ...this.loggedUser };

    Object.keys(this.initialUser).forEach(key => {
      if (this.initialUser[key] === tempUser[key]) {
        delete tempUser[key];
      }
    });

    return tempUser;
  }

  restoreChanges() {
    this.loggedUser = { ...this.initialUser };
  }

  openChangePasswordDialog() {
    const dialogRef = this.dialog.open(ChangePasswordDialogComponent);
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.userService.changePassword(this.loggedUser.id, data);
        this.authService.changePassword(data.newPassword);
        this.toastr.success("Password changed successfully");
        localStorage.setItem("user-logged-in", "false");
        this.userService.storeUsers().subscribe();
      }
    });
  }

  saveChanges() {
    const tempUser = this.removeUnchangedProperties();

    if (this.uploadProfileImg) {
      tempUser["imgPath"] = this.uploadProfileImg;
    }
    this.userService.editUser(this.loggedUser.id, tempUser);
    this.toastr.success("Your profile was successfully changed");
  }
}
