import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { HttpClient, HttpRequest } from "@angular/common/http";
import { Event } from "../models/events.model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class EventsService {
  // constructor(private http: HttpClient) {}
  // eventsChanged = new Subject<Event[]>();
  // private events = [];
  // path = "https://egn-project.firebaseio.com/events.json";

  // storeEvents() {
  //   const req = new HttpRequest("PUT", this.path, this.events, {
  //     reportProgress: true
  //   });
  //   return this.http.request(req);
  // }

  // getEvents() {
  //   this.http
  //     .get<Event[]>(this.path, {
  //       observe: "body",
  //       responseType: "json"
  //     })
  //     .pipe(
  //       map(events => {
  //         if (events) {
  //           for (let event of events) {
  //             if (!event["attendingMembers"]) {
  //               event["attendingMembers"] = [];
  //             }
  //           }
  //           return events;
  //         }
  //       })
  //     )
  //     .subscribe((events: Event[]) => {
  //       this.setEvents(events);
  //     });
  // }

  // setEvents(events: Event[]) {
  //   if (!!events) {
  //     this.events = events;
  //     this.eventsChanged.next(this.events.slice());
  //   }
  // }

  // createEvent(event: Event) {
  //   this.events.push(event);
  //   this.eventsChanged.next(this.events.slice());
  // }

  // getEvent(index: number) {
  //   return this.events[index];
  // }
  constructor(private http: HttpClient) {}
  eventsChanged = new Subject<Event[]>();
  private events = [];
  pathFull = "https://egn-project.firebaseio.com/events.json";

  storeEvents() {
    const req = new HttpRequest("PUT", this.pathFull, this.events, {
      reportProgress: true
    });
    return this.http.request(req);
  }

  getEvents() {
    this.http
      .get<Event[]>(this.pathFull, {
        observe: "body",
        responseType: "json"
      })
      .pipe(
        map(events => {
          if (events) {
            for (let event of events) {
              if (!event["members"]) {
                event["members"] = [];
              }
              if (!event["posts"]) {
                event["posts"] = [];
              }
            }
            return events;
          }
        })
      )
      .subscribe((events: Event[]) => {
        this.setEvents(events);
      });
  }

  setEvents(events: Event[]) {
    if (!!events) {
      this.events = events;
      this.eventsChanged.next(this.events.slice());
    }
  }

  getEvent(index: number) {
    return this.events[index];
  }

  createEvent(event: Event) {
    this.events.push(event);
    this.eventsChanged.next(this.events.slice());
  }

  deleteEvent(eventID: number) {
    for (let event of this.events) {
      if (event.id === eventID) {
        const eventIndex = this.events.indexOf(event);
        this.events.splice(eventIndex, 1);
      }
    }
    this.eventsChanged.next(this.events.slice());
  }
}
