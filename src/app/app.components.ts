import { AppComponent } from "./root/app.component";

// components

// pages
import { LoginComponent } from "./pages/login/login.component";
import { HomePageComponent } from "./pages/homePage/homePage.component";

// dialogs
import { ForgotPasswordDialogComponent } from "./dialogs/forgotPassword/forgotPassword";
import { CreatePostDialogComponent } from "./dialogs/createNewPost/createPost";
import { EventsComponent } from "./components/events-meetings/events.component";
import { HeaderComponent } from "./components/header/header.component";
import { PeersComponent } from "./components/peers/peers.component";
import { GroupsComponent } from "./pages/groups/groups.component";
import { CalendarComponent } from "./pages/calendar/calendar.component";
import { QueriesComponent } from "./pages/queries/queries.component";
import { PostsComponent } from "./components/posts/posts.component";
import { CommentsComponent } from "./components/comments/comments.component";
import { UserComponent } from "./pages/userPage/user.component";
import { ArraySortPipe } from "./pipes/sort.pipe";
import { LinkifyPipe } from "./pipes/linkify.pipe";
import { EditProfileComponent } from "./pages/editProfile/editProfile.component";
import { CountrySelectComponent } from "./components/country-select/country-select.component";
import { ChangePasswordDialogComponent } from "./dialogs/changePassword/changePassword";
import { QuestionDialogComponent } from "./dialogs/question/question";
import { RegisterAccountDialogComponent } from "./dialogs/registerNewAccount/registerAccount";
import { ViewFullPictureDialogComponent } from "./dialogs/viewFullPicture/viewPicture";

export const components = [
  AppComponent,
  EventsComponent,
  HeaderComponent,
  PeersComponent,
  PostsComponent,
  CommentsComponent,
  CountrySelectComponent,
  // components

  // pages
  LoginComponent,
  HomePageComponent,
  GroupsComponent,
  CalendarComponent,
  QueriesComponent,
  UserComponent,
  EditProfileComponent,

  // dialogs
  ForgotPasswordDialogComponent,
  CreatePostDialogComponent,
  ChangePasswordDialogComponent,
  QuestionDialogComponent,
  RegisterAccountDialogComponent,
  ViewFullPictureDialogComponent
];

export const pipes = [
  //Pipes
  ArraySortPipe,
  LinkifyPipe
];
