import { Router, ActivatedRoute } from "@angular/router";
import * as firebase from "firebase";
import { Injectable, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class AuthService implements OnInit {
  token: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}

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
          .then((token: string) => {
            this.token = token;
          });
      })
      .catch(error => {
        if (error.code === "auth/wrong-password") {
          this.toastr.error("The password is wrong. Please try again");
        }
        if (error.code === "auth/user-not-found") {
          this.toastr.error(
            "This user does not exist. Please insert a valid email"
          );
        }
      });
  }

  changePassword(password: string) {
    let user = firebase.auth().currentUser;
    let newPassword = password;

    user.updatePassword(newPassword).then(
      () => {
        // Update successful.
      },
      error => {
        // An error happened.
      }
    );
  }

  deleteUser() {
    var user = firebase.auth().currentUser;

    user
      .delete()
      .then(function() {
        // User deleted.
      })
      .catch(function(error) {
        // An error happened.
      });
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
    } else if (localStorage["user-logged-in"] === "true") {
      return true;
    } else {
      this.router.navigate(["/login"], { relativeTo: this.route });
      return false;
    }
  }
}
