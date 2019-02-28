import { NgModule } from '@angular/core';
import {
  MatNativeDateModule, MatButtonModule, MatFormFieldModule,
  MatInputModule, MatRippleModule, MatDialogModule,
} from '@angular/material';

@NgModule({
  imports: [
    MatNativeDateModule, MatButtonModule, MatFormFieldModule,
    MatInputModule, MatRippleModule, MatDialogModule,
  ],
  exports: [
    MatNativeDateModule, MatButtonModule, MatFormFieldModule,
    MatInputModule, MatRippleModule, MatDialogModule,
  ],
  entryComponents: [],
})


export class MaterialModule { }
