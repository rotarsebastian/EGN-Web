import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/users.model";
import * as firebase from "firebase";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  loggedUser: User = {
    id: 0,
    name: "Anna Petersen",
    position: "Project Manager",
    company: "Google DK",
    email: "anapetersen@gmail.dk",
    password: "anapetersen"
  };

  constructor() {}

  ngOnInit() {
    this.loggedUser.name = firebase.auth().currentUser.displayName;
  }
}
