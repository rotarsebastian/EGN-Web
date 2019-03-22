import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { HttpClient, HttpRequest } from "@angular/common/http";
import { User } from "../models/users.model";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  constructor(private http: HttpClient, private router: Router) {}
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
    this.storeUsers().subscribe();
    this.router.navigate(["/login"]);
  }

  changePassword(id: number, data: any) {
    for (let user of this.users) {
      if (id === user.id) {
        user.password = data.newPassword;
      }
    }
    this.usersChanged.next(this.users.slice());
  }

  editUser(userId: number, data: any) {
    for (let user of this.users) {
      if (user.id === userId) {
        for (const key in data) {
          user[key] = data[key];
        }
        localStorage.setItem("currentUser", JSON.stringify(user));
      }
    }
    this.usersChanged.next(this.users.slice());
    this.storeUsers().subscribe();
    this.router.navigate(["/user", userId]);
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
