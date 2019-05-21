import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { UsersService } from "src/app/services/users.service";
import { User } from "src/app/models/users.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-peers",
  templateUrl: "./peers.component.html",
  styleUrls: ["./peers.component.scss"]
})
export class PeersComponent implements OnInit, AfterViewInit {
  peers: any;
  subscription: Subscription;
  //@ViewChild("peerUserImg") peerUserImg: any;
  loggedUser: User;
  public routerLinkVariable = "/user";

  constructor(private userService: UsersService, private router: Router) {
    let currentUser = localStorage.getItem("currentUser");
    this.loggedUser = JSON.parse(currentUser);
  }

  ngOnInit() {
    this.peers = [];
    this.userService.getUsers();
    this.subscription = this.userService.usersChanged.subscribe(
      (users: User[]) => {
        for (let myUser of users) {
          if (this.loggedUser.id === myUser.id) {
            this.peers = myUser.peers;
          }
        }
      }
    );
  }

  navigateTo(id: number) {
    this.router.navigate(["/user", id]);
  }

  ngAfterViewInit() {
    // if (this.peers.imgPath != "unset") {
    //   this.peerUserImg.nativeElement.style.backgroundImage = `url("${
    //     this.peerUserImg.imgPath
    //   }")`;
    // }
  }
}
