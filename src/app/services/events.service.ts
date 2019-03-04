import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { HttpClient } from "@angular/common/http";
import { Event } from "../models/events.model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class EventsService {
  constructor(private http: HttpClient) {}
  eventsChanged = new Subject<Event[]>();
  private events = [];
  path = "../assets/json/events.json";

  getEvents() {
    this.http
      .get<Event[]>(this.path, {
        observe: "body",
        responseType: "json"
      })
      .pipe(
        map(events => {
          return events;
        })
      )
      .subscribe((events: Event[]) => {
        this.setEvents(events);
      });
  }

  setEvents(events: Event[]) {
    this.events = events;
    this.eventsChanged.next(this.events.slice());
  }

  getEvent(index: number) {
    return this.events[index];
  }
}
