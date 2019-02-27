import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  emailIsValid: boolean = false;
  passwordIsValid: boolean = false;

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
