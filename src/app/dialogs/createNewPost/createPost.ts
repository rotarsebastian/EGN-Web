import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material";

@Component({
  selector: "app-create-post",
  templateUrl: "./createPost.html",
  styleUrls: ["./createPost.scss"]
})
export class CreatePostDialogComponent implements OnInit {
  postMessage: string;
  groupNames: any;

  constructor(public dialogRef: MatDialogRef<CreatePostDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.postMessage = "";
    this.groupNames = [
      { name: "Marketing Group", value: "1", checked: false },
      { name: "Sales Group", value: "2", checked: false },
      { name: "Management Group", value: "3", checked: false }
    ];
  }

  submit(): void {
    const selectedGroups = this.getSelectedGroups();
    console.log(this.isAnyChecked());
    this.close({ postMessage: this.postMessage, groupNames: selectedGroups });
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
    return this.groupNames.filter(opt => opt.checked).map(opt => opt.name);
  }

  close(data: any = null): void {
    this.dialogRef.close(data);
  }
}
