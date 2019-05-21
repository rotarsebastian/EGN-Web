import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { HttpClient, HttpRequest } from "@angular/common/http";
import { Group } from "../models/groups.model";
import { map } from "rxjs/operators";
import { group } from "@angular/animations";

@Injectable({
  providedIn: "root"
})
export class GroupsService {
  constructor(private http: HttpClient) {}
  groupsChanged = new Subject<Group[]>();
  private groups = [];
  pathFull = "https://egn-project.firebaseio.com/groups.json";

  storeGroups() {
    const req = new HttpRequest("PUT", this.pathFull, this.groups, {
      reportProgress: true
    });
    return this.http.request(req);
  }

  getGroups() {
    this.http
      .get<Group[]>(this.pathFull, {
        observe: "body",
        responseType: "json"
      })
      .pipe(
        map(groups => {
          if (groups) {
            for (let group of groups) {
              if (!group["members"]) {
                group["members"] = [];
              }
              if (!group["posts"]) {
                group["posts"] = [];
              }
            }
            return groups;
          }
        })
      )
      .subscribe((groups: Group[]) => {
        this.setGroups(groups);
      });
  }

  setGroups(groups: Group[]) {
    if (!!groups) {
      this.groups = groups;
      this.groupsChanged.next(this.groups.slice());
    }
  }

  getGroup(index: number) {
    return this.groups[index];
  }

  createGroup(group: Group) {
    this.groups.push(group);
    this.groupsChanged.next(this.groups.slice());
  }

  deleteGroup(groupID: number) {
    for (let group of this.groups) {
      if (group.id === groupID) {
        const groupIndex = this.groups.indexOf(group);
        this.groups.splice(groupIndex, 1);
      }
    }
    this.groupsChanged.next(this.groups.slice());
  }

  deleteGroupPost(groupID: number, postID: number) {
    for (let group of this.groups) {
      if (group.id === groupID) {
        for (let post of group.posts) {
          if (post.id === postID) {
            const postIndex = group.posts.indexOf(post);
            group.posts.splice(postIndex, 1);
          }
        }
      }
    }
  }
}
