import { Component, OnInit, Input } from "@angular/core";
import { EventsService } from "src/app/services/events.service";
import { Subscription } from "rxjs";
import { Event } from "../../models/events.model";

@Component({
  selector: "app-event-item",
  templateUrl: "./event-item.component.html",
  styleUrls: ["./event-item.component.scss"]
})
export class EventItemComponent implements OnInit {
  @Input() event: Event;
  subscription: Subscription;

  constructor(private eventsService: EventsService) {}

  ngOnInit() {
    // this.eventsService.getEvents();
    // this.subscription = this.eventsService.eventsChanged.subscribe(
    //   (events: Event[]) => {
    //     this.events = events;
    //     //console.log(this.events[0].date.toISOString());
    //   }
    // );
  }
}
