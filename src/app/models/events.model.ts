export class Event {
  public id: number;
  public name: string;
  public eventStart: string;
  public eventEnd: string;
  public tags: [string];
  public date: string;
  constructor(
    id: number,
    name: string,
    eventStart: string,
    eventEnd: string,
    tags: [string],
    date: string
  ) {
    this.id = id;
    this.name = name;
    this.eventStart = eventStart;
    this.eventEnd = eventEnd;
    this.tags = tags;
    this.date = date;
  }
}
