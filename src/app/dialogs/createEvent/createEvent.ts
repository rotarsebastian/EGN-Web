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
  eventTags: any;

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
    this.eventTags = [
      { name: "Business", checked: false },
      { name: "Meeting", checked: false },
      { name: "Presentation", checked: false }
    ];
  }

  submit(): void {
    const selectedTags = this.getSelectedEvents();

    this.close({
      eventName: this.eventName,
      startTime: this.startTime,
      endTime: this.endTime,
      address: this.address,
      selectedTags: selectedTags
    });
  }

  isAnyChecked() {
    const checkedTags = this.eventTags
      .filter(opt => opt.checked)
      .map(opt => opt.name);
    if (checkedTags.length === 0) {
      return false;
    } else {
      return true;
    }
  }

  getSelectedEvents() {
    return this.eventTags.filter(opt => opt.checked).map(opt => opt.name);
  }

  close(data: any = null): void {
    this.dialogRef.close(data);
  }
}
