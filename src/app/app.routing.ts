import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { HomePageComponent } from "./pages/homePage/homePage.component";
import { GroupsComponentPage } from "./pages/groups/groupsPage.component";
import { CalendarComponent } from "./pages/calendar/calendar.component";
import { MembersComponent } from "./pages/members/members.component";
import { AuthGuardService } from "./services/auth-guard.service";
import { UserComponent } from "./pages/userPage/user.component";
import { EditProfileComponent } from "./pages/editProfile/editProfile.component";
import { SingleGroupComponent } from "./components/groups/single-group/singleGroup.component";

const appRoutes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  {
    path: "home",
    component: HomePageComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "groups",
    component: GroupsComponentPage,
    canActivate: [AuthGuardService]
  },
  {
    path: "groups/:id",
    component: SingleGroupComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "calendar",
    component: CalendarComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "members",
    component: MembersComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "user/:id",
    component: UserComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "user/edit/:id",
    component: EditProfileComponent,
    canActivate: [AuthGuardService]
  },
  { path: "**", redirectTo: "/login" }
];

export const routing = RouterModule.forRoot(appRoutes);
