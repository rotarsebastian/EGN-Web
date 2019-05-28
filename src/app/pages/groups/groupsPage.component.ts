import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Group } from "src/app/models/groups.model";
import { GroupsService } from "src/app/services/groups.service";
import { CreateGroupDialogComponent } from "src/app/dialogs/createGroup/createGroup";
import { ToastrService } from "ngx-toastr";
import { MatDialog } from "@angular/material";
import { v4 as uuid } from "uuid";

@Component({
  selector: "app-groups-page",
  templateUrl: "./groupsPage.component.html",
  styleUrls: ["./groupsPage.component.scss"]
})
export class GroupsComponentPage implements OnInit {
  subscription: Subscription;
  groups: Group[];
  isWaiting: boolean;
  createGroupResult: any;
  loggedUser: any;

  constructor(
    private groupService: GroupsService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {
    let currentUser = localStorage.getItem("currentUser");
    this.loggedUser = JSON.parse(currentUser);
  }

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

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateGroupDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.createGroupResult = result;
        this.createGroup(result.groupName, result.groupStatus);
      }
    });
  }

  createGroup(groupName: string, groupStatus: string) {
    const date = new Date();

    const group = new Group(
      uuid(),
      groupName,
      [],
      [],
      groupStatus,
      date.toISOString()
    );
    console.log("Created " + group.id);

    this.toastr.success("Your group has been created.");

    this.groupService.createGroup(group);
    this.groupService.storeGroups().subscribe();
  }

  canSeeSettingsPage() {
    return this.loggedUser.role === "admin";
  }
}
