import { Component, OnInit, Inject } from "@angular/core";

import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-create-group",
  templateUrl: "./createGroup.html",
  styleUrls: ["./createGroup.scss"]
})
export class CreateGroupDialogComponent implements OnInit {
  groupStatus: string[];
  groupName: string;
  groupStatusChoice: string;

  constructor(
    public dialogRef: MatDialogRef<CreateGroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.groupName = "";
    this.groupStatusChoice = "";
    this.groupStatus = ["public", "private"];
  }

  submit(): void {
    this.close({
      groupName: this.groupName,
      groupStatus: this.groupStatusChoice
    });
  }

  close(data: any = null): void {
    this.dialogRef.close(data);
  }
}
