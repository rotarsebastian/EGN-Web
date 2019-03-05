export class User {
  public id: number;
  public name: string;
  public position: string;
  public email: string;
  public password: string;
  constructor(
    id: number,
    name: string,
    position: string,
    email: string,
    password: string
  ) {
    this.id = id;
    this.name = name;
    this.position = position;
    this.email = email;
    this.password = password;
  }
}
