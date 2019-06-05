import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { EventsService } from "src/app/services/events.service";
import { Event } from "src/app/models/events.model";
import { v4 as uuid } from "uuid";
import { ToastrService } from "ngx-toastr";
import { MatDialog } from "@angular/material";
import { CreateEventDialogComponent } from "src/app/dialogs/createEvent/createEvent";
import { UsersService } from "src/app/services/users.service";
import { User } from "src/app/models/users.model";

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"]
})
export class CalendarComponent implements OnInit {
  events: Event[];
  isWaiting: boolean;
  createEventResult: any;
  loggedUser: any;
  subscription: Subscription;

  constructor(
    private eventService: EventsService,
    private userService: UsersService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {
    let currentUser = localStorage.getItem("currentUser");
    this.loggedUser = JSON.parse(currentUser);
  }

  ngOnInit() {
    this.events = [];
    this.isWaiting = false;
    this.loggedUser = this.userService.getCurrentUser();
    this.getEvents();
  }

  getEvents() {
    this.isWaiting = true;
    this.eventService.getEvents();
    this.subscription = this.eventService.eventsChanged.subscribe(
      (events: Event[]) => {
        this.events = events;
        this.isWaiting = false;
      },
      err => {
        this.isWaiting = false;
      }
    );
  }

  createEvent(
    eventName: string,
    eventStart: string,
    eventEnd: string,
    address: string,
    selectedTags: any
  ) {
    const event = new Event(
      uuid(),
      eventName,
      eventStart,
      eventEnd,
      address,
      [],
      selectedTags
    );
    console.log("Created " + event.id);

    this.toastr.success("Your event has been created.");

    this.eventService.createEvent(event);
    this.eventService.storeEvents().subscribe();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateEventDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.createEventResult = result;
        this.createEvent(
          result.eventName,
          result.startTime,
          result.endTime,
          result.address,
          result.selectedTags
        );
      }
    });
  }

  canSeeSettingsPage() {
    return this.loggedUser.role === "admin";
  }
}
