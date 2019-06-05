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
import { CalendarComponent } from "./pages/calendar/calendar.component";
import { MembersComponent } from "./pages/members/members.component";
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
import { GroupsComponent } from "./components/groups/groups.component";
import { GroupsComponentPage } from "./pages/groups/groupsPage.component";
import { SingleGroupComponent } from "./components/groups/single-group/singleGroup.component";
import { GroupActivityComponent } from "./components/groups/groupActivity/groupActivity.component";
import { GroupMembersComponent } from "./components/groups/groupMembers/groupMembers.component";
import { GroupSettingsComponent } from "./components/groups/groupSettings/groupSettings.component";
import { GroupSelectListComponent } from "./components/groups/groupSettings/group-select-list/group-select-list.component";
import { CreateGroupDialogComponent } from "./dialogs/createGroup/createGroup";
import { EventItemComponent } from "./components/event-item/event-item.component";
import { CreateEventDialogComponent } from "./dialogs/createEvent/createEvent";

export const components = [
  AppComponent,
  EventsComponent,
  HeaderComponent,
  PeersComponent,
  PostsComponent,
  CommentsComponent,
  CountrySelectComponent,
  GroupsComponent,
  SingleGroupComponent,
  GroupActivityComponent,
  GroupMembersComponent,
  GroupSettingsComponent,
  GroupSelectListComponent,
  EventItemComponent,
  // components

  // pages
  LoginComponent,
  HomePageComponent,
  GroupsComponentPage,
  CalendarComponent,
  MembersComponent,
  UserComponent,
  EditProfileComponent,

  // dialogs
  ForgotPasswordDialogComponent,
  CreatePostDialogComponent,
  ChangePasswordDialogComponent,
  QuestionDialogComponent,
  RegisterAccountDialogComponent,
  ViewFullPictureDialogComponent,
  CreateGroupDialogComponent,
  CreateEventDialogComponent
];

export const pipes = [
  //Pipes
  ArraySortPipe,
  LinkifyPipe
];
