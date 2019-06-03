import { Component, OnInit, OnChanges } from "@angular/core";
import { EventsService } from "src/app/services/events.service";
import { Subscription } from "rxjs";
import { Event } from "../../models/events.model";

@Component({
  selector: "app-events",
  templateUrl: "./events.component.html",
  styleUrls: ["./events.component.scss"]
})
export class EventsComponent implements OnInit {
  events: any = [];
  subscription: Subscription;
  loggedUser: any;

  constructor(private eventsService: EventsService) {
    let currentUser = localStorage.getItem("currentUser");
    this.loggedUser = JSON.parse(currentUser);
  }

  ngOnInit() {
    this.events = [];
    this.eventsService.getEvents();
    this.subscription = this.eventsService.eventsChanged.subscribe(
      (events: Event[]) => {
        for (let event of events) {
          if (event.attendingMembers) {
            for (let member of event.attendingMembers) {
              if (member.id === this.loggedUser.id) {
                this.events.push(event);
              }
            }
          }
        }
        this.events = this.events.filter(
          (group, index, self) =>
            index === self.findIndex(t => t.id === group.id)
        );
      }
    );
  }
}
