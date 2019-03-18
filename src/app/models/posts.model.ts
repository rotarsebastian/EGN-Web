import { Comment } from "./comment.model";
import { Like } from "./likes.model";

export class Post {
  public id: number;
  public authorID: number;
  public author: string;
  public authorImgPath: string;
  public position: string;
  public company: string;
  public date: string;
  public message: string;
  public likes: Like[];
  public comments: Comment[];

  constructor(
    id: number,
    authorID: number,
    author: string,
    authorImgPath: string,
    position: string,
    company: string,
    date: string,
    message: string,
    likes: Like[],
    comments: Comment[]
  ) {
    this.id = id;
    this.authorID = authorID;
    this.author = author;
    this.authorImgPath = authorImgPath;
    this.position = position;
    this.company = company;
    this.date = date;
    this.message = message;
    this.likes = likes;
    this.comments = comments;
  }
}
