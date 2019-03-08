import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/users.model";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  loggedUser: User;

  constructor() {}

  ngOnInit() {
    let currentUser = localStorage.getItem("currentUser");
    this.loggedUser = JSON.parse(currentUser);
  }
}
