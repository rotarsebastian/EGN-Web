import { Component, Input, ViewChild, OnInit } from "@angular/core";

import { User } from "src/app/models/users.model";
import { Group } from "src/app/models/groups.model";
import { Router } from "@angular/router";
import { QuestionDialogComponent } from "src/app/dialogs/question/question";
import { ToastrService } from "ngx-toastr";
import { MatDialog } from "@angular/material";
import { GroupsService } from "src/app/services/groups.service";
import { UsersService } from "src/app/services/users.service";

@Component({
  selector: "app-groups",
  templateUrl: "./groups.component.html",
  styleUrls: ["./groups.component.scss"]
})
export class GroupsComponent implements OnInit {
  @Input() group: Group;
  @Input() index: number;
  @ViewChild("entireGroup") entireGroup: any;
  @ViewChild("closingButton") closingButton: any;

  loggedUser: User;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private groupService: GroupsService,
    private userService: UsersService
  ) {
    let currentUser = localStorage.getItem("currentUser");
    this.loggedUser = JSON.parse(currentUser);
  }

  ngOnInit() {
    this.userService.usersChanged.subscribe((users: User[]) => {
      for (let user of users) {
        if (this.loggedUser.id === user.id) {
          this.loggedUser = user;
        }
      }
    });
  }

  viewGroup(event: any) {
    if (this.loggedUser.role === "user") {
      this.router.navigate(["groups", this.group.id]);
    } else if (event.target !== this.closingButton.nativeElement) {
      this.router.navigate(["groups", this.group.id]);
    }
  }

  canSeeGroup() {
    let canSee = false;
    if (this.loggedUser.role === "admin") {
      canSee = true;
    }
    if (this.group.status === "public") {
      canSee = true;
    }
    for (let oneGroup of this.loggedUser.groups) {
      if (this.group.id === oneGroup.id) {
        canSee = true;
      }
    }
    return canSee;
  }

  getBackgroundImage() {
    return `url(./assets/images/close.svg)`;
  }

  deleteGroup() {
    const dialogRef = this.dialog.open(QuestionDialogComponent, {
      width: "600px",
      data: {
        title: "Delete group",
        description:
          "Are you sure you want to delete this group ? This change is irreversible."
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("Deleted " + this.group.id);
        this.groupService.deleteGroup(this.group.id);
        this.groupService.storeGroups().subscribe();
        this.toastr.success("Your group has been deleted.");
      }
    });
  }
}
