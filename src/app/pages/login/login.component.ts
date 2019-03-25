import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDialog } from "@angular/material";

import { ForgotPasswordDialogComponent } from "../../dialogs/forgotPassword/forgotPassword";
import { UsersService } from "src/app/services/users.service";
import { Subscription } from "rxjs";
import { User } from "src/app/models/users.model";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  emailIsValid = false;
  passwordIsValid = false;
  emailToRecoverAccount: string;
  users;
  subscription: Subscription;
  incorrectPassword: boolean = false;
  incorrectEmail: boolean = false;

  constructor(
    private dialog: MatDialog,
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.usersService.getUsers();
    this.subscription = this.usersService.usersChanged.subscribe(
      (users: User[]) => {
        this.users = users;
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ForgotPasswordDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.emailToRecoverAccount = result;
      }
    });
  }

  instantValidationEmail(event: any) {
    if (event.srcElement.classList.contains("ng-valid")) {
      this.emailIsValid = true;
      this.incorrectEmail = false;
      event.srcElement.classList.remove("invalid-input");
    } else {
      this.emailIsValid = false;
      this.incorrectEmail = false;
      event.srcElement.classList.add("invalid-input");
    }
  }

  instantValidationPassword(event: any) {
    if (event.srcElement.classList.contains("ng-valid")) {
      this.passwordIsValid = true;
      this.incorrectPassword = false;
      event.srcElement.classList.remove("invalid-input");
    } else {
      this.passwordIsValid = false;
      this.incorrectPassword = false;
      event.srcElement.classList.add("invalid-input");
    }
  }

  onLogin(loginForm: NgForm) {
    // let myUserName: string;

    // let foundUser = false;
    // for (let user of this.users) {
    //   if (
    //     loginForm.value.email === user.email &&
    //     loginForm.value.password === user.password
    //   ) {
    //     foundUser = true;
    //     myUserName = user.name;
    //     //loginForm.reset();
    //     break;
    //   } else if (
    //     loginForm.value.email === user.email &&
    //     loginForm.value.password !== user.password
    //   ) {
    //     this.incorrectPassword = true;
    //     foundUser = true;
    //   } else if (
    //     loginForm.value.email !== user.email &&
    //     loginForm.value.password == user.password
    //   ) {
    //     this.incorrectEmail = true;
    //     foundUser = true;
    //   }
    // }
    // if (!foundUser) {
    //   this.incorrectEmail = true;
    //   this.incorrectPassword = true;
    // }

    const email = loginForm.value.email;
    const password = loginForm.value.password;

    this.authService.signinUser(email, password);

    for (let oneUser of this.users) {
      if (oneUser.email === email && oneUser.password === password) {
        this.usersService.setCurrentUser(oneUser);
        let copy = oneUser;
        delete copy.password;
        localStorage.setItem("currentUser", JSON.stringify(copy));
        localStorage.setItem("user-logged-in", "true");
      }
    }

    //console.log(firebase.auth().currentUser);
  }
}
