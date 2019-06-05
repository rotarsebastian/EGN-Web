import { Component, OnInit, Inject } from "@angular/core";
import { Subscription } from "rxjs";
import { Group } from "src/app/models/groups.model";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { UsersService } from "src/app/services/users.service";
import { User } from "src/app/models/users.model";

@Component({
  selector: "app-create-post",
  templateUrl: "./createPost.html",
  styleUrls: ["./createPost.scss"]
})
export class CreatePostDialogComponent implements OnInit {
  postMessage: string;
  groupNames: any;
  subscription: Subscription;
  groups: Group[];
  noGroups: boolean;
  groupNameData: string;
  loggedUser: any;
  currentUser: any;

  constructor(
    public dialogRef: MatDialogRef<CreatePostDialogComponent>,
    private userService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    let currentUser = localStorage.getItem("currentUser");
    this.loggedUser = JSON.parse(currentUser);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.noGroups = false;
    if (this.data) {
      this.noGroups = this.data.noGroups;
      this.groupNameData = this.data.groupName;
    }
    this.groupNames = [];

    this.loggedUser = this.userService.getCurrentUser();
    this.currentUser = this.userService.getCurrentUser();
    for (let group of this.currentUser.groups) {
      const groupElement = {
        id: group.id,
        name: `${group.name} Group`,
        value: `${this.loggedUser.groups.indexOf(group)}`,
        checked: false
      };

      this.groupNames.push(groupElement);
    }
    this.groupNames = this.groupNames.filter(
      (group, index, self) => index === self.findIndex(t => t.id === group.id)
    );

    // this.userService.getUsers();
    // this.userService.usersChanged.subscribe(
    //   (users: User[]) => {

    //   },
    //   err => {}
    // );

    this.postMessage = "";
  }

  submit(): void {
    const selectedGroups = this.getSelectedGroups();
    const selectedGroupsNames = this.getSelectedGroupsName();
    console.log(this.isAnyChecked());
    this.close({
      postMessage: this.postMessage,
      groupIDs: selectedGroups,
      groupNames: selectedGroupsNames
    });
  }

  isAnyChecked() {
    if (this.noGroups) {
      return true;
    }
    if (this.loggedUser.groups.length === 0) {
      return true;
    }
    const checkedGroups = this.groupNames
      .filter(opt => opt.checked)
      .map(opt => opt.name);
    if (checkedGroups.length === 0) {
      return false;
    } else {
      return true;
    }
  }

  getSelectedGroups() {
    return this.groupNames.filter(opt => opt.checked).map(opt => opt.id);
  }

  getSelectedGroupsName() {
    return this.groupNames.filter(opt => opt.checked).map(opt => opt.name);
  }

  close(data: any = null): void {
    this.dialogRef.close(data);
  }
}
