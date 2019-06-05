import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { NgModel } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { UsersService } from "src/app/services/users.service";
import { Subscription } from "rxjs";
import { GroupsService } from "src/app/services/groups.service";
import { Group } from "src/app/models/groups.model";

@Component({
  selector: "app-group-select-list",
  templateUrl: "./group-select-list.component.html",
  styleUrls: ["./group-select-list.component.scss"]
})
export class GroupSelectListComponent implements OnInit {
  @Input() groupListChoices: any;
  @Input() user: any;
  subscription: Subscription;
  groups: Group[];
  selectedGroups: any;

  constructor(
    private toastr: ToastrService,
    private userService: UsersService,
    private groupService: GroupsService
  ) {}

  ngOnInit() {
    this.getGroups();
  }

  equals(objOne, objTwo) {
    if (typeof objOne !== "undefined" && typeof objTwo !== "undefined") {
      return objOne.id === objTwo.id;
    }
  }

  selectAll(select: NgModel, values) {
    select.update.emit(values);
  }

  deselectAll(select: NgModel) {
    select.update.emit([]);
  }

  getGroups() {
    this.groupService.getGroups();
    this.subscription = this.groupService.groupsChanged.subscribe(
      (groups: Group[]) => {
        this.groups = groups;
      },
      err => {}
    );
  }

  addUserToGroup() {
    if (this.user["groups"].length === 0) {
      for (let selectedGroup of this.selectedGroups) {
        this.user[`groups`].push(selectedGroup);
      }
    } else {
      for (let selectedGroup of this.selectedGroups) {
        if (this.user["groups"].indexOf(selectedGroup) === -1) {
          this.user[`groups`].push(selectedGroup);
        }
      }
    }

    this.user[`groups`] = this.user[`groups`].filter(
      (group, index, self) =>
        index ===
        self.findIndex(t => t.id === group.id && t.name === group.name)
    );

    //console.log(this.user[`groups`]);
    this.addUserToAllSelectedGroups(this.user["groups"], this.user);

    this.selectedGroups = [];

    this.toastr.success(`${this.user["name"]} was addeed into the groups`);
    this.userService.storeUsers().subscribe();
  }

  removeUserFromGroup() {
    let somethingDeleted: boolean = false;
    if (this.groupListChoices.length === this.selectedGroups.length) {
      this.user[`groups`] = [];
      somethingDeleted = true;
    } else {
      for (let selectedGroup of this.selectedGroups) {
        for (let userGroup of this.user["groups"]) {
          if (userGroup.id === selectedGroup.id) {
            const groupIndex = this.user["groups"].indexOf(userGroup);
            this.user["groups"].splice(groupIndex, 1);
            somethingDeleted = true;
          }
        }
      }
    }

    //console.log(this.user[`groups`]);
    this.removeUserFromAllSelectedGroups(this.user["groups"], this.user);

    this.selectedGroups = [];

    if (somethingDeleted) {
      this.toastr.success(`${this.user["name"]} was removed from the groups`);
    } else {
      this.toastr.error(
        `${this.user["name"]} is not part of any selected group`
      );
    }

    this.userService.storeUsers().subscribe();
  }

  addUserToAllSelectedGroups(userGroups: any, user: any) {
    for (let userGroup of userGroups) {
      for (let group of this.groups) {
        if (group.id === userGroup.id) {
          group.members.push(user);
        }
        group.members = group.members.filter(
          (group, index, self) =>
            index ===
            self.findIndex(t => t.id === group.id && t.name === group.name)
        );
      }
    }

    this.groupService.storeGroups().subscribe();
  }

  removeUserFromAllSelectedGroups(userGroups: any, user: any) {
    for (let group of this.groups) {
      for (let groupMember of group.members) {
        if (groupMember.id === user.id) {
          const memberIndex = group.members.indexOf(groupMember);
          group.members.splice(memberIndex, 1);
        }
      }
    }
    this.addUserToAllSelectedGroups(userGroups, user);
    for (let group of this.groups) {
      console.log(group.members);
    }
    this.groupService.storeGroups().subscribe();
  }

  isButtonDisabled() {
    let isDisabled = true;
    for (let selectedGroup of this.selectedGroups) {
      for (let userGroup of this.user["groups"]) {
        if (userGroup.id === selectedGroup.id) {
          isDisabled = false;
        }
      }
    }
    return isDisabled;
  }

  isButtonAddDisabled() {
    let isDisabled = false;
    let count = 0;
    for (let selectedGroup of this.selectedGroups) {
      for (let userGroup of this.user["groups"]) {
        if (userGroup.id === selectedGroup.id) {
          count++;
        }
      }
    }

    if (count === this.selectedGroups.length) {
      isDisabled = true;
    }

    return isDisabled;
  }
}
