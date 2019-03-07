import { PeersService } from "./services/peers.service";
import { EventsService } from "./services/events.service";
import { UsersService } from "./services/users.service";
import { PostsService } from "./services/posts.service";
import { AuthService } from "./services/auth.service";
import { AuthGuardService } from "./services/auth-guard.service";

export const services = [
  PeersService,
  EventsService,
  UsersService,
  PostsService,
  AuthService,
  AuthGuardService
];
