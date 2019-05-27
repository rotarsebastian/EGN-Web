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
import { NgxWebstorageModule } from "ngx-webstorage";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireDatabaseModule } from "@angular/fire/database";

export const imports = [
  BrowserModule,
  HttpClientModule,
  FormsModule,
  ReactiveFormsModule,
  BrowserAnimationsModule,
  routing,
  MaterialModule,
  ClickOutsideModule,
  ScrollingModule,
  MatNativeDateModule,
  NgxWebstorageModule.forRoot(),
  ToastrModule.forRoot({
    timeOut: 2500,
    positionClass: "toast-bottom-right",
    preventDuplicates: true
  }),
  LinkyModule,
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
  AngularFireModule.initializeApp({
    apiKey: "AIzaSyBohyRVA454ltGvbvXrIdvqyvzMQMSSyho",
    authDomain: "egn-project.firebaseapp.com",
    databaseURL: "https://egn-project.firebaseio.com",
    projectId: "egn-project",
    storageBucket: "egn-project.appspot.com",
    messagingSenderId: "931205090881"
  }),
  AngularFirestoreModule,
  AngularFireAuthModule,
  AngularFireStorageModule,
  AngularFireDatabaseModule
];
