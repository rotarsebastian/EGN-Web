import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { HttpClient, HttpRequest } from "@angular/common/http";
import { User } from "../models/users.model";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import * as firebase from "firebase";

import randomName from "uuid/v1";

import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private db: AngularFireDatabase
  ) {
    // db.list<User>("users")
    //   .valueChanges()
    //   .subscribe(console.log);
  }
  usersChanged = new Subject<User[]>();
  private users = [];

  //myUsersForSearch: AngularFireList<User>;

  loggedInUser: User;
  pathFull = "https://egn-project.firebaseio.com/users.json";

  storeUsers() {
    const req = new HttpRequest("PUT", this.pathFull, this.users, {
      reportProgress: true
    });
    return this.http.request(req);
  }

  getUsersForSearch(start, end): AngularFireList<User> {
    return this.db.list("users", ref =>
      ref
        .orderByChild("name")
        .limitToFirst(10)
        .startAt(start)
        .endAt(end)
    );
  }

  getUsers() {
    this.http
      .get<User[]>(this.pathFull, {
        observe: "body",
        responseType: "json"
      })
      .pipe(
        map(users => {
          if (users) {
            for (let user of users) {
              if (!user["peers"]) {
                user["peers"] = [];
              }
              if (!user["groups"]) {
                user["groups"] = [];
              }
              if (!user["events"]) {
                user["events"] = [];
              }
            }
            return users;
          }
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
        // const userIndex = this.users.indexOf(user);
        // this.users.splice(userIndex, 1);
        const copyId = user.id;

        for (var variableKey in user) {
          if (user.hasOwnProperty(variableKey)) {
            delete user[variableKey];
          }
        }
        user.id = copyId;
        user.position = "Deleted member";
        user.wasDeleted = true;
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

  // createPeer(peer: Peer, user: User) {
  //   const index = this.users.indexOf(user);
  //   this.users[index].peers.push(peer);
  //   this.usersChanged.next(this.users.slice());
  //   console.log(this.usersChanged);
  // }

  editUser(userId: number, data: any) {
    for (let user of this.users) {
      if (user.id === userId) {
        for (const key in data) {
          if (key === "imgFile") {
            var storageRef = firebase.storage().ref();
            var profileRef = storageRef.child(randomName());
            var profileImagesRef = storageRef.child(
              "profileImages/" + profileRef
            );
            var imageFile = data[key];
            profileImagesRef.put(imageFile).then(function(snapshot) {
              console.log("Uploaded a file!");
              profileImagesRef
                .getDownloadURL()
                .then(link => {
                  user[key] = link;
                  let copy = { ...user };
                  delete copy["password"];
                  localStorage.setItem("currentUser", JSON.stringify(copy));
                })
                .then(() => {
                  let currentUser = localStorage.getItem("currentUser");
                  let myUser = JSON.parse(currentUser);
                  user["imgPath"] = myUser.imgPath;
                });
            });
          } else {
            user[key] = data[key];
          }
        }
        let userCopy = { ...user };
        delete userCopy["password"];
        localStorage.setItem("currentUser", JSON.stringify(userCopy));
      }
    }

    this.usersChanged.next(this.users.slice());
    this.storeUsers().subscribe();
    //this.router.navigate(["/user", userId]);
  }

  addNewUser(newUser: any) {
    this.users.push(newUser);
    this.usersChanged.next(this.users.slice());
    this.storeUsers().subscribe();
  }

  getUser(userId: number) {
    for (let user of this.users) {
      if (user.id == userId) {
        return user;
      }
    }
  }

  getLastUser() {
    return this.users[this.users.length - 1];
  }

  setCurrentUser(currUser: any) {
    this.loggedInUser = currUser;
  }

  getCurrentUser() {
    return this.loggedInUser;
  }
}
