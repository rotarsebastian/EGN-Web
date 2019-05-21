import { User } from "./users.model";
import { Post } from "./posts.model";

export class Group {
  public id: number;
  public name: string;
  public members: User[];
  public posts: Post[];
  public status: string;
  public createdAt: string;
  constructor(
    id: number,
    name: string,
    members: User[],
    posts: Post[],
    status: string,
    createdAt: string
  ) {
    this.id = id;
    this.name = name;
    this.members = members;
    this.posts = posts;
    this.status = status;
    this.createdAt = createdAt;
  }
}
