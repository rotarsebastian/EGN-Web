import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { GroupsService } from "../services/groups.service";
import { Subscription, Observable } from "rxjs";
import { Group } from "../models/groups.model";
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  loginPage: boolean = false;
  homePage: boolean = false;
  subscription: Subscription;
  privateGroups: Group[] = [];
  publicGroups: Group[] = [];
  groups: Group[];
  users: Observable<any[]>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private groupService: GroupsService,
    private db: AngularFirestore
  ) {
    this.users = db.collection("users").valueChanges();
  }

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
    }
    this.router.navigate(["/home"]);
    this.getGroups();
  }

  getGroups() {
    this.groupService.getGroups();
    this.subscription = this.groupService.groupsChanged.subscribe(
      (groups: Group[]) => {
        this.groups = groups;
        if (this.privateGroups.length === 0 && this.publicGroups.length === 0) {
          for (let group of groups) {
            if (group.status === "private") {
              this.privateGroups.push(group);
            }
            if (group.status === "public") {
              this.publicGroups.push(group);
            }
          }
        }
      },
      err => {}
    );
  }
}
