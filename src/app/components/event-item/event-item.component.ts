import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { EventsService } from "src/app/services/events.service";
import { Subscription } from "rxjs";
import { Event } from "../../models/events.model";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material";
import { ToastrService } from "ngx-toastr";
import { QuestionDialogComponent } from "src/app/dialogs/question/question";
import { UsersService } from "src/app/services/users.service";

@Component({
  selector: "app-event-item",
  templateUrl: "./event-item.component.html",
  styleUrls: ["./event-item.component.scss"]
})
export class EventItemComponent implements OnInit {
  @Input() event: Event;
  subscription: Subscription;
  loggedUser: any;
  attendText: string;
  attendIcon: string;
  @ViewChild("closingButton") closingButton: any;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private eventService: EventsService,
    private userService: UsersService
  ) {
    let currentUser = localStorage.getItem("currentUser");
    this.loggedUser = JSON.parse(currentUser);
  }

  ngOnInit() {
    this.getMyStatusText();
  }

  getBackgroundImage() {
    return `url(/assets/images/close.svg)`;
  }

  getCoverImg() {
    return `url(/assets/images/events-banner.png)`;
  }

  deleteEvent() {
    const dialogRef = this.dialog.open(QuestionDialogComponent, {
      width: "600px",
      data: {
        title: "Delete event",
        description:
          "Are you sure you want to delete this event ? This change is irreversible."
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("Deleted " + this.event.id);
        this.eventService.deleteEvent(this.event.id);
        this.eventService.storeEvents().subscribe();
        this.toastr.success("Your event has been deleted.");
      }
    });
  }

  getMyStatusText() {
    let isAttending = false;

    if (
      this.event.attendingMembers &&
      this.event["attendingMembers"].length !== 0
    ) {
      for (let member of this.event["attendingMembers"]) {
        if (this.loggedUser.id === member.id) {
          isAttending = true;
        }
      }
    }

    isAttending
      ? (this.attendText = "Attending")
      : (this.attendText = "Not attending");

    isAttending ? (this.attendIcon = "done") : (this.attendIcon = "block");
  }

  attendToEvent() {
    let isAlreadyAttending = false;

    if (this.attendText === "Attending") {
      this.attendText = "Not attending";
      this.attendIcon = "block";
    } else {
      this.attendText = "Attending";
      this.attendIcon = "done";
    }

    if (
      this.event.attendingMembers &&
      this.event["attendingMembers"].length !== 0
    ) {
      for (let member of this.event["attendingMembers"]) {
        if (this.loggedUser.id === member.id) {
          isAlreadyAttending = true;
          const memberIndex = this.event.attendingMembers.indexOf(member);
          this.event["attendingMembers"].splice(memberIndex, 1);
          this.eventService.storeEvents().subscribe();
        }
      }
    }

    if (!isAlreadyAttending) {
      if (!this.event["attendingMembers"]) {
        this.event["attendingMembers"] = [];
      }
      this.event["attendingMembers"].push(this.loggedUser);
      this.eventService.storeEvents().subscribe();
    }
  }
}
