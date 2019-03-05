import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDialog } from "@angular/material";

import { ForgotPasswordDialogComponent } from "../../dialogs/forgotPassword/forgotPassword";
import { Router, ActivatedRoute } from "@angular/router";
import { UsersService } from "src/app/services/users.service";
import { Subscription } from "rxjs";
import { User } from "src/app/models/users.model";

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
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    public usersService: UsersService
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
        console.log(this.emailToRecoverAccount);
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
    let foundUser = false;
    for (let user of this.users) {
      if (
        loginForm.value.email === user.email &&
        loginForm.value.password === user.password
      ) {
        foundUser = true;
        loginForm.reset();
        this.usersService.setUserLoggedIn(user);
        this.router.navigate(["/home"], { relativeTo: this.route });
        break;
      } else if (
        loginForm.value.email === user.email &&
        loginForm.value.password !== user.password
      ) {
        this.incorrectPassword = true;
        foundUser = true;
      } else if (
        loginForm.value.email !== user.email &&
        loginForm.value.password == user.password
      ) {
        this.incorrectEmail = true;
        foundUser = true;
      }
    }
    if (!foundUser) {
      this.incorrectEmail = true;
      this.incorrectPassword = true;
    }
  }
}
