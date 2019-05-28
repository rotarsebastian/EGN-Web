import { Component, Input, ViewChild } from "@angular/core";

import { User } from "src/app/models/users.model";
import { Group } from "src/app/models/groups.model";
import { Router } from "@angular/router";
import { QuestionDialogComponent } from "src/app/dialogs/question/question";
import { ToastrService } from "ngx-toastr";
import { MatDialog } from "@angular/material";
import { GroupsService } from "src/app/services/groups.service";

@Component({
  selector: "app-groups",
  templateUrl: "./groups.component.html",
  styleUrls: ["./groups.component.scss"]
})
export class GroupsComponent {
  @Input() group: Group;
  @Input() index: number;
  @ViewChild("entireGroup") entireGroup: any;
  @ViewChild("closingButton") closingButton: any;

  loggedUser: User;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private groupService: GroupsService
  ) {
    let currentUser = localStorage.getItem("currentUser");
    this.loggedUser = JSON.parse(currentUser);
  }

  viewGroup(event: any) {
    if (event.target !== this.closingButton.nativeElement) {
      this.router.navigate(["groups", this.group.id]);
    }
  }

  canSeeGroup() {
    let canSee = false;
    if (this.loggedUser.role === "admin") {
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
    return `url(/assets/images/close.svg)`;
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
