import { Component, OnInit } from "@angular/core";
import { PeersService } from "src/app/services/peers.service";
import { Peer } from "src/app/models/peers.model";
import { Subscription } from "rxjs";

@Component({
  selector: "app-peers",
  templateUrl: "./peers.component.html",
  styleUrls: ["./peers.component.scss"]
})
export class PeersComponent implements OnInit {
  peers;
  subscription: Subscription;

  constructor(private peersService: PeersService) {}

  ngOnInit() {
    this.peersService.getPeers();
    this.subscription = this.peersService.peersChanged.subscribe(
      (peers: Peer[]) => {
        this.peers = peers;
      }
    );
  }
}
