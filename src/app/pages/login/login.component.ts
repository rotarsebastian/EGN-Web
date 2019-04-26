import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDialog } from "@angular/material";

import { ForgotPasswordDialogComponent } from "../../dialogs/forgotPassword/forgotPassword";
import { UsersService } from "src/app/services/users.service";
import { Subscription } from "rxjs";
import { User } from "src/app/models/users.model";
import { AuthService } from "src/app/services/auth.service";
import { RegisterAccountDialogComponent } from "src/app/dialogs/registerNewAccount/registerAccount";

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
        this.authService.resetPassword(this.emailToRecoverAccount);
      }
    });
  }

  openRegisterModal(): void {
    const dialogRef = this.dialog.open(RegisterAccountDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        var actionCodeSettings = {
          // URL you want to redirect back to. The domain (www.example.com) for this
          // URL must be whitelisted in the Firebase Console.
          url: "http://localhost:4200/home",
          // This must be true.
          handleCodeInApp: true
        };
        this.authService.activateAccount(
          result.email,
          actionCodeSettings,
          result.password
        );
        //YOU NEED TO CREATE AN USER ONCE YOU SEND THE LINK AND STORE ON LOCAL STORAGE AND ON CLICK USER GETS SIGNED IN
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
    const email = loginForm.value.email;
    const password = loginForm.value.password;

    this.authService.signinUser(email, password);

    for (let oneUser of this.users) {
      if (oneUser.email === email) {
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
