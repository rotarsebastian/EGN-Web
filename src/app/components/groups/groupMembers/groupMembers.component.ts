import { Component, Input, OnInit } from "@angular/core";

import { GroupsService } from "src/app/services/groups.service";
import { Subscription } from "rxjs";
import { Group } from "src/app/models/groups.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-group-members",
  templateUrl: "./groupMembers.component.html",
  styleUrls: ["./groupMembers.component.scss"]
})
export class GroupMembersComponent implements OnInit {
  @Input("groupID") groupID: number;
  @Input("group") group: any;

  members: any;
  subscription: Subscription;
  isWaiting: boolean;

  constructor(private groupService: GroupsService, private router: Router) {}

  ngOnInit() {
    this.groupService.getGroups();
    this.isWaiting = true;
    this.subscription = this.groupService.groupsChanged.subscribe(
      (groups: Group[]) => {
        for (let oneGroup of groups) {
          if (oneGroup.id === this.groupID) {
            this.group = oneGroup;
            this.members = oneGroup.members;
            this.isWaiting = false;
            break;
          }
        }
      },
      err => {
        this.isWaiting = false;
      }
    );
  }

  getImage(index: number) {
    return this.members[index].imgPath !== "unset"
      ? `url(${this.members[index].imgPath})`
      : `url(./assets/images/standardProfile.svg)`;
  }

  navigateTo(id: number) {
    this.router.navigate(["/user", id]);
  }
}
