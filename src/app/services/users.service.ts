import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { HttpClient } from "@angular/common/http";
import { User } from "../models/users.model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  constructor(private http: HttpClient) {}
  usersChanged = new Subject<User[]>();
  private users = [];
  path = "../assets/json/users.json";
  loggedInUser: User;

  getUsers() {
    this.http
      .get<User[]>(this.path, {
        observe: "body",
        responseType: "json"
      })
      .pipe(
        map(users => {
          return users;
        })
      )
      .subscribe((users: User[]) => {
        this.setUsers(users);
      });
  }

  setUsers(users: User[]) {
    this.users = users;
    this.usersChanged.next(this.users.slice());
  }

  setUserLoggedIn(user: User) {
    this.loggedInUser = user;
  }

  getLoggedInUser() {
    return this.loggedInUser;
  }

  getUser(index: number) {
    return this.users[index];
  }
}
