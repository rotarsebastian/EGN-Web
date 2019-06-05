import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { UsersService } from "src/app/services/users.service";
import { User } from "src/app/models/users.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-peers",
  templateUrl: "./peers.component.html",
  styleUrls: ["./peers.component.scss"]
})
export class PeersComponent implements OnInit {
  peers: any;
  subscription: Subscription;
  loggedUser: User;
  peersUpdated: any;
  users: any;
  public routerLinkVariable = "/user";
  isWaiting: boolean = false;

  constructor(private userService: UsersService, private router: Router) {
    let currentUser = localStorage.getItem("currentUser");
    this.loggedUser = JSON.parse(currentUser);
  }

  ngOnInit() {
    this.isWaiting = true;
    this.peers = [];
    this.peersUpdated = [];

    this.subscription = this.userService.usersChanged.subscribe(
      (users: User[]) => {
        this.users = users;
        for (let myUser of users) {
          if (this.loggedUser.id === myUser.id) {
            this.peers = myUser.peers;
            this.loggedUser = myUser;
          }
        }
        for (let user of users) {
          if (this.peers) {
            for (let peer of this.peers) {
              if (user.id === peer.id) {
                this.peersUpdated.push(user);
              }
            }
          }
        }

        this.peersUpdated = this.peersUpdated.filter(
          (group, index, self) =>
            index === self.findIndex(t => t.id === group.id)
        );
        this.peers = this.peersUpdated;
        this.loggedUser.peers = this.peers;
        this.isWaiting = false;
      },
      err => {
        this.isWaiting = false;
      }
    );
  }

  navigateTo(id: number) {
    this.router.navigate(["/user", id]);
  }

  getImage(peerIMG: any) {
    return peerIMG === "unset"
      ? `url(./assets/images/standardProfile.svg)`
      : `url(${peerIMG})`;
  }
}
