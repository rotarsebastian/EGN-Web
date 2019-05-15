import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-view-picture",
  templateUrl: "./viewPicture.html",
  styleUrls: ["./viewPicture.scss"]
})
export class ViewFullPictureDialogComponent {
  image: string;

  constructor(
    public dialogRef: MatDialogRef<ViewFullPictureDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.image = this.data.image;
  }

  getImage() {
    return this.image;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
