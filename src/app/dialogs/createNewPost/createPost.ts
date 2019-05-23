import { Component, OnInit, Inject } from "@angular/core";
import { Subscription } from "rxjs";
import { GroupsService } from "src/app/services/groups.service";
import { Group } from "src/app/models/groups.model";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { database } from "firebase";

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
  noGroups: boolean;
  groupNameData: string;

  constructor(
    public dialogRef: MatDialogRef<CreatePostDialogComponent>,
    private groupService: GroupsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.noGroups = false;
    //this.groupNameData = "";
    if (this.data) {
      this.noGroups = this.data.noGroups;
      this.groupNameData = this.data.groupName;
    }
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
    if (this.noGroups) {
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
