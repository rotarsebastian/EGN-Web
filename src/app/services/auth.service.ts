import { Router, ActivatedRoute } from "@angular/router";
import * as firebase from "firebase";
import { Injectable, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { UsersService } from "./users.service";
import { v4 as uuid } from "uuid";

@Injectable()
export class AuthService implements OnInit {
  token: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private userService: UsersService
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

  resetPassword(email: string) {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        this.toastr.success("The reset password email was sent successfully");
      })
      .catch(error => {
        let errorCode = error.code;
        if (errorCode === "auth/invalid-email") {
          this.toastr.error("Please insert a valid email");
        } else if (errorCode === "auth/user-not-found") {
          this.toastr.error("Your email is not registered");
        }
        console.log(error);
      });
  }

  // verifyEmail(email: string) {
  //   user.sendEmailVerification().then(function() {
  //     // Email sent.
  //   }).catch(function(error) {
  //     // An error happened.
  //   });
  // }

  activateAccount(email, settings, password) {
    firebase
      .auth()
      .sendSignInLinkToEmail(email, settings)
      .then(() => {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.

        this.createNewUser(email, password);

        this.toastr.success(`An email was sent to ${email}`, null, {
          timeOut: 7500
        });
        console.log("succes");
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  // checkSignInMethod() {
  //   if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
  //     var emailFromStorage = window.localStorage.getItem("emailForSignIn");
  //     var passwordFromStorage = window.localStorage.getItem(
  //       "passwordForSignIn"
  //     );
  //     if (!emailFromStorage) {
  //       emailFromStorage = window.prompt(
  //         "Please provide your email for confirmation"
  //       );
  //     }

  //     // The client SDK will parse the code from the link for you.
  //     firebase
  //       .auth()
  //       .signInWithEmailLink(emailFromStorage, window.location.href)
  //       .then(function(result) {
  //         window.localStorage.removeItem("emailForSignIn");
  //         window.localStorage.removeItem("passwordForSignIn");
  //       })
  //       .catch(function(error) {
  //         // Some error occurred, you can inspect the code: error.code
  //         // Common errors could be invalid email and invalid or expired OTPs.
  //       });
  //   }
  // }

  createNewUser(email: any, password: any) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        const newUser = {
          id: uuid(),
          imgPath: "unset",
          name: "New user",
          position: "New member",
          company: "Unknown company",
          email: email,
          wasDeleted: false,
          role: "user"
        };

        this.userService.addNewUser(newUser);
        this.userService.setCurrentUser(newUser);
        window.localStorage.setItem("currentUser", JSON.stringify(newUser));
        window.localStorage.setItem("user-logged-in", "true");
      })
      .catch(error => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error);
      });
  }

  deleteUser() {
    var user = firebase.auth().currentUser;

    user
      .delete()
      .then(function() {
        // User deleted.
      })
      .catch(function(error) {
        console.log(error);
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
