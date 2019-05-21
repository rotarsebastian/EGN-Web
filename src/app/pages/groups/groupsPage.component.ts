import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { PostsService } from "src/app/services/posts.service";
import { Post } from "src/app/models/posts.model";
import { Group } from "src/app/models/groups.model";
import { GroupsService } from "src/app/services/groups.service";

@Component({
  selector: "app-groups-page",
  templateUrl: "./groupsPage.component.html",
  styleUrls: ["./groupsPage.component.scss"]
})
export class GroupsComponentPage implements OnInit {
  subscription: Subscription;
  groups: Group[];
  isWaiting: boolean;

  constructor(private groupService: GroupsService) {}

  ngOnInit() {
    this.isWaiting = false;
    this.groups = [];
    this.getGroups();
  }

  getGroups() {
    this.isWaiting = true;
    this.groupService.getGroups();
    this.subscription = this.groupService.groupsChanged.subscribe(
      (groups: Group[]) => {
        this.isWaiting = false;
        this.groups = groups;
      },
      err => {
        this.isWaiting = false;
      }
    );
  }
}
