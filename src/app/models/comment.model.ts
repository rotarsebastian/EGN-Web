export class Comment {
  constructor(
    public id: number,
    public author: string,
    public authorID: number,
    public authorImgPath: string,
    public content: string
  ) {}
}
