import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { EventsService } from "src/app/services/events.service";
import { MatDialog } from "@angular/material";
import { ToastrService } from "ngx-toastr";
import { Event } from "src/app/models/events.model";

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
    this.eventService.getEvents();
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
}
