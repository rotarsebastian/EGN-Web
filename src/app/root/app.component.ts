import { Component } from "@angular/core";
import { Router, NavigationStart } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  loginPage: boolean = false;
  homePage: boolean = false;

  constructor(private router: Router) {
    router.events.forEach(event => {
      if (event instanceof NavigationStart) {
        if (event["url"] == "/") {
          this.loginPage = true;
        } else if (event["url"] == "/home") {
          this.homePage = true;
          this.loginPage = false;
        } else {
          this.loginPage = false;
          this.homePage = false;
        }
      }
    });
  }
}
