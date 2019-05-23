import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { Router, ActivatedRoute } from "@angular/router";
import { Post } from "src/app/models/posts.model";
import { StorageService } from "src/app/services/storage.service";
import { ChangeSubpageService } from "src/app/services/changeSubpage.service";
import { GroupsService } from "src/app/services/groups.service";
import { Group } from "src/app/models/groups.model";

@Component({
  selector: "app-single-group",
  templateUrl: "./singleGroup.component.html",
  styleUrls: ["./singleGroup.component.scss"]
})
export class SingleGroupComponent implements OnInit, OnDestroy {
  loggedUser: any;
  groupID: number;
  posts: Post[];
  subscription: Subscription;
  groupName: String;
  changeGroupSubpageRef: Subscription;
  groupNameTop: String;
  groupNamePicture: String;

  // group: any;
  subpages: any[];
  selectedSubpage: number;
  isSettingsHovered: boolean;
  isScrollEventListenerSet: boolean;
  currentScrollValue: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private groupService: GroupsService,
    private storage: StorageService,
    private changeSubpageService: ChangeSubpageService
  ) {
    let currentUser = localStorage.getItem("currentUser");
    this.loggedUser = JSON.parse(currentUser);
  }

  ngOnInit() {
    this.subpages = [
      { icon: "/assets/images/feed-transparent.svg", name: "Activity" },
      { icon: "/assets/images/members.svg", name: "Members" }
    ];

    // Init the subpage accordingly
    setTimeout(() => {
      const lastGroupId = this.storage.lastGroupVisited;
      const lastSubpage = this.storage.groupSubpage;
      this.selectedSubpage =
        !lastGroupId || this.groupID !== lastGroupId || !lastSubpage
          ? 0
          : lastSubpage;
      this.storage.lastGroupVisited = this.groupID;
    }, 100);

    this.isSettingsHovered = false;
    this.isScrollEventListenerSet = false;
    this.currentScrollValue = 0;

    this.route.params.subscribe(params => {
      this.groupID = params["id"];
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    });

    this.setListScrollHandler();

    this.changeGroupSubpageRef = this.changeSubpageService.changeGroupSubpageSource.subscribe(
      index => {
        setTimeout(() => {
          this.selectedSubpage = index;
        }, 200);
      }
    );

    this.getPosts();
  }

  getPosts() {
    this.groupService.getGroups();
    this.subscription = this.groupService.groupsChanged.subscribe(
      (groups: Group[]) => {
        for (let oneGroup of groups) {
          if (oneGroup.id === this.groupID) {
            this.groupName = oneGroup.name;
            this.groupNamePicture = this.getTitle("name");
            this.groupNameTop = this.getTitle("title");
            break;
          }
        }
      },
      err => {}
    );
  }

  // goToEditProfile() {
  //   this.router.navigate(["/user/edit", this.loggedUser.id]);
  // }

  ngOnDestroy() {
    this.changeGroupSubpageRef.unsubscribe();
  }

  setListScrollHandler() {
    if (this.isScrollEventListenerSet) {
      return false;
    }

    const listElem: any = document.querySelector(".group_profile_body");
    const groupContainerElem: any = document.querySelector(".group_container");
    const groupHeaderElem: any = document.querySelector(
      ".group_profile_header"
    );
    if (!listElem) {
      return false;
    }

    listElem.addEventListener("scroll", () => {
      this.isScrollEventListenerSet = true;

      const { scrollTop, scrollHeight, clientHeight } = listElem;
      const groupContainerClientHeight = groupContainerElem.clientHeight;

      // scrolled to bottom
      if (clientHeight === scrollHeight - scrollTop) {
        return;
      }

      if (scrollHeight >= groupContainerClientHeight) {
        this.toggleScrollingDownClass(groupHeaderElem, scrollTop);
        this.currentScrollValue = scrollTop;
      }
    });
  }

  toggleScrollingDownClass(elem: any, scrollTop: number) {
    if (elem) {
      if (scrollTop > this.currentScrollValue) {
        elem.classList.add("scrolling_down");
      } else if (scrollTop <= 100) {
        elem.classList.remove("scrolling_down");
      }
    }
  }

  viewSubpage(index: number) {
    this.selectedSubpage = index;
    this.storage.groupSubpage = index;
    this.toggleScrollingDownClass(
      document.querySelector(".group_profile_header"),
      0
    );
    document.querySelector(".group_profile_body").scrollTop = 0;
  }

  canSeeSettingsPage() {
    return this.loggedUser.role === "admin";
  }

  goBackToGroups() {
    this.router.navigate(["/groups"]);
  }

  getTitle(location: string) {
    if (location === "title") {
      return this.groupName ? `${this.groupName} group posts` : ``;
    } else {
      return this.groupName ? `${this.groupName} group` : ``;
    }
  }

  // getBackgroundImage() {
  //   if (this.loggedUser) {
  //     return this.loggedUser.imgPath !== "unset"
  //       ? `url(${this.loggedUser.imgPath})`
  //       : `url(/assets/images/standardProfile.svg)`;
  //   }
  // }

  getBackgroundImage() {
    return `url(/assets/images/banner-group.png)`;
  }
}
