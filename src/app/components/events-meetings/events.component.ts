import { Component, OnInit } from "@angular/core";
import { EventsService } from "src/app/services/events.service";
import { Subscription } from "rxjs";
import { Event } from "../../models/events.model";

@Component({
  selector: "app-events",
  templateUrl: "./events.component.html",
  styleUrls: ["./events.component.scss"]
})
export class EventsComponent implements OnInit {
  events;
  subscription: Subscription;

  constructor(private eventsService: EventsService) {}

  ngOnInit() {
    this.eventsService.getEvents();
    this.subscription = this.eventsService.eventsChanged.subscribe(
      (events: Event[]) => {
        this.events = events;
      }
    );
  }
}
