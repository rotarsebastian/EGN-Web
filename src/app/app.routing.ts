import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { HomePageComponent } from "./pages/homePage/homePage.component";
import { GroupsComponent } from "./pages/groups/groups.component";
import { CalendarComponent } from "./pages/calendar/calendar.component";
import { QueriesComponent } from "./pages/queries/queries.component";

const appRoutes: Routes = [
  { path: "", component: LoginComponent },
  { path: "home", component: HomePageComponent },
  { path: "groups", component: GroupsComponent },
  { path: "calendar", component: CalendarComponent },
  { path: "queries", component: QueriesComponent },
  { path: "**", redirectTo: "" }
];

export const routing = RouterModule.forRoot(appRoutes);
