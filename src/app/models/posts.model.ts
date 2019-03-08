import { Comment } from "./comment.model";
import { Like } from "./likes.model";

export class Post {
  public id: number;
  public author: string;
  public position: string;
  public company: string;
  public date: string;
  public message: string;
  public likes: Like[];
  public comments: Comment[];

  constructor(
    id: number,
    author: string,
    position: string,
    company: string,
    date: string,
    message: string,
    likes: Like[],
    comments: Comment[]
  ) {
    this.id = id;
    this.author = author;
    this.position = position;
    this.company = company;
    this.date = date;
    this.message = message;
    this.likes = likes;
    this.comments = comments;
  }
}
