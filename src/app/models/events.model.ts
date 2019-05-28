import { User } from "./users.model";

export class Event {
  public id: number;
  public name: string;
  public eventStart: string;
  public eventEnd: string;
  public date: string;
  public address: string;
  public attendingMembers: User[];
  constructor(
    id: number,
    name: string,
    eventStart: string,
    eventEnd: string,
    date: string,
    address: string,
    attendingMembers: User[]
  ) {
    this.id = id;
    this.name = name;
    this.eventStart = eventStart;
    this.eventEnd = eventEnd;
    this.date = date;
    this.address = address;
    this.attendingMembers = attendingMembers;
  }
}
