import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { HomePageComponent } from "./pages/homePage/homePage.component";
import { GroupsComponent } from "./pages/groups/groups.component";
import { CalendarComponent } from "./pages/calendar/calendar.component";
import { QueriesComponent } from "./pages/queries/queries.component";
import { AuthGuardService } from "./services/auth-guard.service";
import { CreatePostDialogComponent } from "./dialogs/createNewPost/createPost";

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
    component: GroupsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "calendar",
    component: CalendarComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "queries",
    component: QueriesComponent,
    canActivate: [AuthGuardService]
  },
  { path: "**", redirectTo: "/login" }
];

export const routing = RouterModule.forRoot(appRoutes);
