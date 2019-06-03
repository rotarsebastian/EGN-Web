import { Component, OnInit, Inject } from "@angular/core";

import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-create-event",
  templateUrl: "./createEvent.html",
  styleUrls: ["./createEvent.scss"]
})
export class CreateEventDialogComponent implements OnInit {
  eventName: string;
  startTime: string;
  endTime: string;
  address: string;

  constructor(
    public dialogRef: MatDialogRef<CreateEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.eventName = "";
    this.startTime = "";
    this.endTime = "";
    this.address = "";
  }

  submit(): void {
    this.close({
      eventName: this.eventName,
      startTime: this.startTime,
      endTime: this.endTime,
      address: this.address
    });
  }

  close(data: any = null): void {
    this.dialogRef.close(data);
  }
}
