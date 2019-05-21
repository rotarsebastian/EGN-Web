// import { Injectable } from "@angular/core";
// import { Subject } from "rxjs";

// import { HttpClient, HttpRequest } from "@angular/common/http";
// import { Peer } from "../models/peers.model";
// import { map } from "rxjs/operators";

// @Injectable({
//   providedIn: "root"
// })
// export class PeersService {
//   constructor(private http: HttpClient) {}
//   peersChanged = new Subject<Peer[]>();
//   private peers = [];
//   path = "https://egn-project.firebaseio.com/peers.json";

//   storePosts() {
//     const req = new HttpRequest("PUT", this.path, this.peers, {
//       reportProgress: true
//     });
//     return this.http.request(req);
//   }

//   getPeers() {
//     this.http
//       .get<Peer[]>(this.path, {
//         observe: "body",
//         responseType: "json"
//       })
//       .pipe(
//         map(peers => {
//           if (peers) {
//             return peers;
//           }
//         })
//       )
//       .subscribe((peers: Peer[]) => {
//         this.setPeers(peers);
//       });
//   }

//   setPeers(peers: Peer[]) {
//     if (peers) {
//       this.peers = peers;
//     } else {
//       this.peers = [];
//     }
//     if (peers) {
//       this.peersChanged.next(this.peers.slice());
//     }
//   }

//   createPeer(peer: Peer) {
//     this.peers.push(peer);
//     this.peersChanged.next(this.peers.slice());
//   }

//   getPeer(index: number) {
//     return this.peers[index];
//   }
// }
