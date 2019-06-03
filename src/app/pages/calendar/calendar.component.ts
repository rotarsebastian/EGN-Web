import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { EventsService } from "src/app/services/events.service";
import { Event } from "src/app/models/events.model";
import { v4 as uuid } from "uuid";
import { ToastrService } from "ngx-toastr";
import { MatDialog } from "@angular/material";
import { CreateEventDialogComponent } from "src/app/dialogs/createEvent/createEvent";

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"]
})
export class CalendarComponent {
  subscription: Subscription;
  events: Event[];
  isWaiting: boolean;
  createEventResult: any;
  loggedUser: any;

  constructor(
    private eventService: EventsService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {
    let currentUser = localStorage.getItem("currentUser");
    this.loggedUser = JSON.parse(currentUser);
  }

  ngOnInit() {
    this.isWaiting = false;
    this.events = [];
    this.getEvents();
  }

  getEvents() {
    this.isWaiting = true;
    this.subscription = this.eventService.eventsChanged.subscribe(
      (events: Event[]) => {
        this.isWaiting = false;
        this.events = events;
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
