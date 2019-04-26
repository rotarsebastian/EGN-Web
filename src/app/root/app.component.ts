import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import * as firebase from "firebase";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  loginPage: boolean = false;
  homePage: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.router.events.forEach(event => {
      if (event instanceof NavigationEnd) {
        if (event["urlAfterRedirects"] === "/login") {
          this.loginPage = true;
          this.homePage = false;
        } else if (event["urlAfterRedirects"] == "/home") {
          this.homePage = true;
          this.loginPage = false;
        } else {
          this.loginPage = false;
          this.homePage = false;
        }
      }
    });

    if (!this.authService.isAuthenticated()) {
      this.loginPage = true;
    } else {
      this.loginPage = false;
      this.router.navigate(["/home"]);
    }

    firebase.initializeApp({
      apiKey: "AIzaSyBohyRVA454ltGvbvXrIdvqyvzMQMSSyho",
      authDomain: "egn-project.firebaseapp.com",
      databaseURL: "https://egn-project.firebaseio.com",
      projectId: "egn-project",
      storageBucket: "egn-project.appspot.com",
      messagingSenderId: "931205090881"
    });
  }
}
