import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { HttpClient, HttpRequest } from "@angular/common/http";
import { User } from "../models/users.model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  constructor(private http: HttpClient) {}
  usersChanged = new Subject<User[]>();
  private users = [];
  //path = "../assets/json/users.json";
  loggedInUser: User;
  pathFull = "https://egn-project.firebaseio.com/users.json";

  storeUsers() {
    const req = new HttpRequest("PUT", this.pathFull, this.users, {
      reportProgress: true
    });
    return this.http.request(req);
  }

  getUsers() {
    this.http
      .get<User[]>(this.pathFull, {
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
    if (!!users) {
      this.users = users;
      this.usersChanged.next(this.users.slice());
    }
  }

  deleteUser(userID: number) {
    for (let user of this.users) {
      if (user.id === userID) {
        const userIndex = this.users.indexOf(user);
        this.users.splice(userIndex, 1);
      }
    }
    this.usersChanged.next(this.users.slice());
  }

  changePassword(id: number, data: any) {
    for (let user of this.users) {
      if (id === user.id) {
        user.password = data.newPassword;
      }
    }
    this.usersChanged.next(this.users.slice());
  }

  getUser(index: number) {
    return this.users[index];
  }

  setCurrentUser(currUser: User) {
    this.loggedInUser = currUser;
  }

  getCurrentUser() {
    return this.loggedInUser;
  }
}
