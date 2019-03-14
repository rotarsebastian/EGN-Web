import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material";

@Component({
  selector: "app-create-post",
  templateUrl: "./createPost.html",
  styleUrls: ["./createPost.scss"]
})
export class CreatePostDialogComponent {
  constructor(public dialogRef: MatDialogRef<CreatePostDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
