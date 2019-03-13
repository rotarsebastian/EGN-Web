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

export const components = [
  AppComponent,
  EventsComponent,
  HeaderComponent,
  PeersComponent,
  PostsComponent,
  CommentsComponent,
  // components

  // pages
  LoginComponent,
  HomePageComponent,
  GroupsComponent,
  CalendarComponent,
  QueriesComponent,

  // dialogs
  ForgotPasswordDialogComponent,
  CreatePostDialogComponent

  //Pipes
];
