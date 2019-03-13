import { Component, OnInit, AfterViewInit } from "@angular/core";
import { User } from "src/app/models/users.model";
import { MatDialog } from "@angular/material";
import { CreatePostDialogComponent } from "src/app/dialogs/createNewPost/createPost";
import { Router, NavigationEnd } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit, AfterViewInit {
  loggedUser: User;
  result: string;
  homePage: boolean = false;

  constructor(private dialog: MatDialog, private router: Router) {}

  ngOnInit() {
    let currentUser = localStorage.getItem("currentUser");
    this.loggedUser = JSON.parse(currentUser);
  }

  ngAfterViewInit() {
    this.router.events.forEach(event => {
      if (event instanceof NavigationEnd) {
        if (event["urlAfterRedirects"] === "/home") {
          this.homePage = true;
        } else {
          this.homePage = false;
        }
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreatePostDialogComponent);

    // dialogRef.afterClosed().subscribe(result => {
    //   if (!!result) {
    //     this.result = result;
    //   }
    // });
  }
}
