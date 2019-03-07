import { Router, ActivatedRoute } from "@angular/router";
import * as firebase from "firebase";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {
  token: string;

  constructor(private router: Router, private route: ActivatedRoute) {}

  signupUser(email: string, password: string) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(error => console.log(error));
  }

  signinUser(email: string, password: string) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        this.router.navigate(["/home"], { relativeTo: this.route });
        firebase
          .auth()
          .currentUser.getIdToken()
          .then((token: string) => (this.token = token));
      })
      .catch(error => console.log(error));
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
  }

  getToken() {
    firebase
      .auth()
      .currentUser.getIdToken()
      .then((token: string) => (this.token = token));
    return this.token;
  }

  isAuthenticated() {
    if (this.token != null) {
      return true;
    } else if (localStorage["user-logged-in"]) {
      return true;
    } else {
      return false;
    }
  }
}
