import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { routing } from "./app.routing";
import { MaterialModule } from "./material.module";
import { ClickOutsideModule } from "ng-click-outside";
import { MatNativeDateModule } from "@angular/material";
import { ToastrModule } from "ngx-toastr";
import { LinkyModule } from "angular-linky";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";

export const imports = [
  BrowserModule,
  HttpClientModule,
  FormsModule,
  ReactiveFormsModule,
  BrowserAnimationsModule,
  routing,
  MaterialModule,
  ClickOutsideModule,
  MatNativeDateModule,
  ToastrModule.forRoot({
    timeOut: 2500,
    positionClass: "toast-bottom-right",
    preventDuplicates: false
  }),
  LinkyModule,
  OwlDateTimeModule,
  OwlNativeDateTimeModule
];
