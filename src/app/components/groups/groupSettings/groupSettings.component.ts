import { Component, OnInit } from "@angular/core";
import { UsersService } from "src/app/services/users.service";
import { User } from "src/app/models/users.model";
import { Subscription } from "rxjs";
import { GroupsService } from "src/app/services/groups.service";
import { Group } from "src/app/models/groups.model";

@Component({
  selector: "app-group-settings",
  templateUrl: "./groupSettings.component.html",
  styleUrls: ["./groupSettings.component.scss"]
})
export class GroupSettingsComponent implements OnInit {
  loggedUser: any;
  isWaiting: boolean;
  allUsers: User[];
  copyUsers: User[];
  subscription: Subscription;
  groups: Group[];
  groupListChoices: any;

  constructor(
    private userService: UsersService,
    private groupService: GroupsService
  ) {
    let currentUser = localStorage.getItem("currentUser");
    this.loggedUser = JSON.parse(currentUser);
  }

  ngOnInit() {
    this.isWaiting = false;
    this.getUsers();
    this.getGroups();
  }

  getGroups() {
    this.groupService.getGroups();
    this.subscription = this.groupService.groupsChanged.subscribe(
      (groups: Group[]) => {
        this.groupListChoices = [];

        this.groups = groups;
        for (let i = 0; i < groups.length; i++) {
          const groupElement = {
            id: groups[i].id,
            name: `${groups[i].name}`,
            value: `${i}`,
            viewValue: `${groups[i].name}`
          };

          this.groupListChoices.push(groupElement);
        }
      },
      err => {}
    );
  }

  isAdmin() {
    return this.loggedUser.role === "admin";
  }

  getUsers() {
    this.isWaiting = true;

    this.userService.getUsers();

    this.userService.usersChanged.subscribe(
      (users: User[]) => {
        for (let user of users) {
          if (this.loggedUser.id === user.id) {
            this.loggedUser = user;
          }
        }
        this.allUsers = [];
        this.copyUsers = [];
        this.isWaiting = false;

        this.allUsers = users;
        this.copyUsers = users;
      },
      err => {
        this.isWaiting = false;
      }
    );
  }

  search($event: any) {
    let value = $event.target.value.toUpperCase();

    this.allUsers = this.copyUsers;

    const result = this.allUsers.filter(user =>
      user.name.toUpperCase().includes(value)
    );

    this.allUsers = result;
  }
}
