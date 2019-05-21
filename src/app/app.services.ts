import { EventsService } from "./services/events.service";
import { UsersService } from "./services/users.service";
import { PostsService } from "./services/posts.service";
import { AuthService } from "./services/auth.service";
import { AuthGuardService } from "./services/auth-guard.service";
import { CountryService } from "./services/country.service";
import { UtilsService } from "./services/utils.service";
import { GroupsService } from "./services/groups.service";

export const services = [
  EventsService,
  UsersService,
  PostsService,
  AuthService,
  AuthGuardService,
  CountryService,
  UtilsService,
  GroupsService
];
