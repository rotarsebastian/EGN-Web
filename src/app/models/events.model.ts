import { User } from "./users.model";

export class Event {
  public id: number;
  public name: string;
  public eventStart: string;
  public eventEnd: string;
  public address: string;
  public attendingMembers: User[];
  public tags: [];
  constructor(
    id: number,
    name: string,
    eventStart: string,
    eventEnd: string,
    address: string,
    attendingMembers: User[],
    tags: []
  ) {
    this.id = id;
    this.name = name;
    this.eventStart = eventStart;
    this.eventEnd = eventEnd;
    this.address = address;
    this.attendingMembers = attendingMembers;
    this.tags = tags;
  }
}
