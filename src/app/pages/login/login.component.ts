import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { ForgotPasswordDialogComponent } from '../../dialogs/forgotPassword/forgotPassword';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  emailIsValid = false;
  passwordIsValid = false;
  emailToRecoverAccount: string;

  constructor(public dialog: MatDialog) {}

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
    if (event.srcElement.classList.contains('ng-valid')) {
      this.emailIsValid = true;
      event.srcElement.classList.remove('invalid-input');
    } else {
      this.emailIsValid = false;
      event.srcElement.classList.add('invalid-input');
    }
  }

  instantValidationPassword(event: any) {
    if (event.srcElement.classList.contains('ng-valid')) {
      this.passwordIsValid = true;
      event.srcElement.classList.remove('invalid-input');
    } else {
      this.passwordIsValid = false;
      event.srcElement.classList.add('invalid-input');
    }
  }

  onLogin(loginForm: NgForm) {
    loginForm.reset();
  }
}
