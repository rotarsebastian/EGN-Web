import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { UsersService } from "src/app/services/users.service";
import { User } from "src/app/models/users.model";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-register-account",
  templateUrl: "./registerAccount.html",
  styleUrls: ["./registerAccount.scss"]
})
export class RegisterAccountDialogComponent {
  email: string;
  emailIsValid = false;
  passwordIsValid = false;
  rePasswordIsValid = false;
  usedEmail = false;
  users: any;
  password: string;
  rePassword: string;

  constructor(
    public dialogRef: MatDialogRef<RegisterAccountDialogComponent>,
    private usersService: UsersService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.users = [];
    this.usersService.getUsers();
    this.usersService.usersChanged.subscribe((users: User[]) => {
      this.users = users;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  setData(email: string, password: string) {
    if (this.users) {
      for (let oneUser of this.users) {
        if (oneUser.email === email) {
          this.usedEmail = true;
        }
      }
    }

    if (this.usedEmail) {
      this.toastr.error("Please choose another email");
    } else {
      const account = {
        email: email,
        password: password
      };
      this.dialogRef.close(account);
    }
  }

  instantValidation(event: any) {
    this.usedEmail = false;
    if (event.srcElement.name === "email") {
      if (event.srcElement.classList.contains("ng-valid")) {
        this.emailIsValid = true;
        event.srcElement.classList.remove("invalid-input");
      } else {
        this.emailIsValid = false;
        event.srcElement.classList.add("invalid-input");
      }
    } else if (event.srcElement.name === "password") {
      if (event.srcElement.classList.contains("ng-valid")) {
        this.passwordIsValid = true;
        event.srcElement.classList.remove("invalid-input");
      } else {
        this.passwordIsValid = false;
        event.srcElement.classList.add("invalid-input");
      }
    } else if (event.srcElement.name === "rePassword") {
      if (event.srcElement.classList.contains("ng-valid")) {
        if (this.password === this.rePassword) {
          this.rePasswordIsValid = true;
          event.srcElement.classList.remove("invalid-input");
        }
      } else {
        if (this.password !== this.rePassword) {
          this.rePasswordIsValid = false;
          event.srcElement.classList.add("invalid-input");
        }
      }
    }
  }
}
