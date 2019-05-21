import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { Subscription } from "rxjs";
import { GroupsService } from "src/app/services/groups.service";
import { Group } from "src/app/models/groups.model";

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
  isWaiting: boolean;

  constructor(
    public dialogRef: MatDialogRef<CreatePostDialogComponent>,
    private groupService: GroupsService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.groupNames = [];
    this.isWaiting = true;
    this.groupService.getGroups();
    this.subscription = this.groupService.groupsChanged.subscribe(
      (groups: Group[]) => {
        this.isWaiting = false;
        this.groups = groups;
        for (let i = 0; i < groups.length; i++) {
          const groupElement = {
            id: groups[i].id,
            name: `${groups[i].name} Group`,
            value: `${i}`,
            checked: false
          };

          this.groupNames.push(groupElement);
        }
      },
      err => {
        this.isWaiting = false;
      }
    );
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
