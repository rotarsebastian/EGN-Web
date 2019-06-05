import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { UsersService } from "src/app/services/users.service";
import { User } from "src/app/models/users.model";
import { Subscription } from "rxjs";
import { Peer } from "src/app/models/peers.model";
import { ToastrService } from "ngx-toastr";
import { Location } from "@angular/common";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"]
})
export class UserComponent implements OnInit {
  loggedUser: any;
  public routerLinkVariable = "/user/edit";
  userId: number;
  user: User;
  subscription: Subscription;

  constructor(
    private router: Router,
    private userService: UsersService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private location: Location
  ) {
    let currentUser = localStorage.getItem("currentUser");
    this.loggedUser = JSON.parse(currentUser);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params["id"];
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    });

    this.loggedUser = this.userService.getCurrentUser();
    this.user = this.userService.getUser(this.userId);
  }

  goToEditProfile() {
    this.router.navigate(["/user/edit", this.loggedUser.id]);
  }

  openLinkedin() {
    window.open(this.loggedUser.linkedInProfile);
  }

  goBackToProfile() {
    this.location.back();
  }

  addToContactList(
    id: number,
    name: string,
    position: string,
    company: string,
    imgPath: string
  ) {
    const newPeer: Peer = {
      id: id,
      name: name,
      position: position,
      company: company,
      imgPath: imgPath
    };
    let goodPeer: boolean = true;

    for (let peer of this.loggedUser.peers) {
      if (newPeer.id === peer.id) {
        goodPeer = false;
      }
    }

    if (goodPeer) {
      this.loggedUser.peers.push(newPeer);
      this.toastr.success(`${newPeer.name} was addeed to your contact list`);
      this.userService.storeUsers().subscribe();
    }
  }

  togglePeer(
    id: number,
    name: string,
    position: string,
    company: string,
    imgPath: string
  ) {
    if (this.isPeer()) {
      this.removeFromContactList(id, name);
    } else {
      this.addToContactList(id, name, position, company, imgPath);
    }
  }

  removeFromContactList(id: number, name: string) {
    for (let peer of this.loggedUser.peers) {
      if (id === peer.id && name === peer.name) {
        this.toastr.success(`${peer.name} was removed from your contact list`);
        const peerIndex = this.loggedUser.peers.indexOf(peer);
        this.loggedUser.peers.splice(peerIndex, 1);
      }
    }

    this.userService.storeUsers().subscribe();
  }

  isPeer() {
    for (let peer of this.loggedUser.peers) {
      if (this.user.id === peer.id) {
        return true;
      }
    }
    return false;
  }

  getProfileImage() {
    if (this.user) {
      return this.user.imgPath !== "unset"
        ? `url(${this.user.imgPath})`
        : `url(./assets/images/standardProfile.svg)`;
    }
  }
}
