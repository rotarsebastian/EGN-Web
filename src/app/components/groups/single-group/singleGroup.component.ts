import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { Router, ActivatedRoute } from "@angular/router";
import { Post } from "src/app/models/posts.model";
import { StorageService } from "src/app/services/storage.service";
import { ChangeSubpageService } from "src/app/services/changeSubpage.service";
import { GroupsService } from "src/app/services/groups.service";
import { Group } from "src/app/models/groups.model";
import { CreateGroupDialogComponent } from "src/app/dialogs/createGroup/createGroup";
import { MatDialog } from "@angular/material";
import { v4 as uuid } from "uuid";
import { ToastrService } from "ngx-toastr";
import { UsersService } from "src/app/services/users.service";
import { User } from "src/app/models/users.model";

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
  oneGroup: any;
  createGroupResult: any;

  subpages: any[];
  selectedSubpage: number;
  isSettingsHovered: boolean;
  isScrollEventListenerSet: boolean;
  currentScrollValue: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private groupService: GroupsService,
    private userService: UsersService,
    private storage: StorageService,
    private changeSubpageService: ChangeSubpageService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {
    let currentUser = localStorage.getItem("currentUser");
    this.loggedUser = JSON.parse(currentUser);
  }

  ngOnInit() {
    this.userService.usersChanged.subscribe((users: User[]) => {
      for (let user of users) {
        if (this.loggedUser.id === user.id) {
          this.loggedUser = user;
        }
      }
    });
    this.subpages = [
      { icon: "./assets/images/feed-transparent.svg", name: "Activity" },
      { icon: "./assets/images/members.svg", name: "Members" }
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

    this.getGroup();
  }

  getGroup() {
    this.oneGroup = this.groupService.getGroupByID(this.groupID);
    this.groupName = this.oneGroup.name;
    this.groupNamePicture = this.getTitle("name");
    this.groupNameTop = this.getTitle("title");
  }

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

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateGroupDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.createGroupResult = result;
        this.createGroup(result.groupName, result.groupStatus);
      }
    });
  }

  createGroup(groupName: string, groupStatus: string) {
    const date = new Date();

    const group = new Group(
      uuid(),
      groupName,
      [],
      [],
      groupStatus,
      date.toISOString()
    );

    this.toastr.success("Your group has been created.");

    this.groupService.createGroup(group);
    this.groupService.storeGroups().subscribe();
  }

  getBackgroundImage() {
    return `url(./assets/images/banner-group.png)`;
  }
}
