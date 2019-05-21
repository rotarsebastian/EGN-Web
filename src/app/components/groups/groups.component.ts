import { Component, Input, ViewChild } from "@angular/core";

import { User } from "src/app/models/users.model";
import { Group } from "src/app/models/groups.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-groups",
  templateUrl: "./groups.component.html",
  styleUrls: ["./groups.component.scss"]
})
export class GroupsComponent {
  @Input() group: Group;
  @Input() index: number;
  @ViewChild("entireGroup") entireGroup: any;

  loggedUser: User;

  constructor(private router: Router) {
    let currentUser = localStorage.getItem("currentUser");
    this.loggedUser = JSON.parse(currentUser);
  }

  viewGroup() {
    this.router.navigate(["groups", this.group.id]);
  }
}
