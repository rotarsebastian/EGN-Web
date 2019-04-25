export class User {
  public id: number;
  public imgPath: string;
  public name: string;
  public position: string;
  public company: string;
  public email: string;
  public password: string;
  public wasDeleted: boolean;
  public role: string;
  constructor(
    id: number,
    imgPath: string,
    name: string,
    position: string,
    company: string,
    email: string,
    password: string,
    wasDeleted: boolean,
    role: string
  ) {
    this.id = id;
    this.imgPath = imgPath;
    this.name = name;
    this.position = position;
    this.company = company;
    this.email = email;
    this.password = password;
    this.wasDeleted = wasDeleted;
    this.role = role;
  }
}
