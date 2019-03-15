import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { HttpClient } from "@angular/common/http";
import { Peer } from "../models/peers.model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class PeersService {
  constructor(private http: HttpClient) {}
  peersChanged = new Subject<Peer[]>();
  private peers = [];
  path = "https://egn-project.firebaseio.com/peers.json";

  getPeers() {
    this.http
      .get<Peer[]>(this.path, {
        observe: "body",
        responseType: "json"
      })
      .pipe(
        map(peers => {
          return peers;
        })
      )
      .subscribe((peers: Peer[]) => {
        this.setPeers(peers);
      });
  }

  setPeers(peers: Peer[]) {
    this.peers = peers;
    this.peersChanged.next(this.peers.slice());
  }

  getPeer(index: number) {
    return this.peers[index];
  }
}
