import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgotPassword.html',
  styleUrls: ['./forgotPassword.scss']
})
export class ForgotPasswordDialogComponent {
  email: string;
  emailIsValid = false;

  constructor(public dialogRef: MatDialogRef<ForgotPasswordDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
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
}
