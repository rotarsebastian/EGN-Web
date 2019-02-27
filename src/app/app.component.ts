import { Component, Inject } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  emailIsValid: boolean = false;
  passwordIsValid: boolean = false;
  email: string;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.email = result;
      } else {
        console.log("The dialog is undefined " + result);
      }
    });
  }

  instantValidationEmail(event: any) {
    console.log(event);
    if (event.srcElement.classList.contains("ng-valid")) {
      this.emailIsValid = true;
      event.srcElement.classList.remove("invalid-input");
    } else {
      this.emailIsValid = false;
      event.srcElement.classList.add("invalid-input");
    }
  }

  instantValidationPassword(event: any) {
    console.log(event);
    if (event.srcElement.classList.contains("ng-valid")) {
      this.passwordIsValid = true;
      event.srcElement.classList.remove("invalid-input");
    } else {
      this.passwordIsValid = false;
      event.srcElement.classList.add("invalid-input");
    }
  }

  onLogin(loginForm: NgForm) {
    console.log(loginForm);
    loginForm.reset();
  }
}

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"]
})
export class ModalComponent {
  email: string;

  constructor(public dialogRef: MatDialogRef<ModalComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
