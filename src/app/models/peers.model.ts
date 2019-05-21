export class Peer {
  public id: number;
  public name: string;
  public position: string;
  public company: string;
  public imgPath: string;
  constructor(
    id: number,
    name: string,
    position: string,
    company: string,
    imgPath: string
  ) {
    this.id = id;
    this.name = name;
    this.position = position;
    this.company = company;
    this.imgPath = imgPath;
  }
}
