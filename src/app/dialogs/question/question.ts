import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-question-dialog',
  templateUrl: 'question.html'
})
export class QuestionDialogComponent implements OnInit {
  title: string;
  description: string;

  constructor(
    public dialogRef: MatDialogRef<QuestionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    this.title = this.data.title;
    this.description = this.data.description;
  }

  close(success: boolean = false): void { this.dialogRef.close(success); }

  submit() { this.close(true); }
}
