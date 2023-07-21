export class Post {
  private _id?: number;
  private _title: string;
  private _content: string;
  private _userId: number;

  constructor(title: string, content: string, userId: number, id?: number) {
    this._id = id;
    this._title = title;
    this._content = content;
    this._userId = userId;
    this.validate();
  }

  validate() {
    if (this._title.length === 0) {
      throw new Error("Title is required");
    }
    if (this._content.length === 0) {
      throw new Error("Content is required");
    }
    if (!this._userId) {
      throw new Error("UserId is required");
    }
  }

  get id() {
    return this._id;
  }

  get userId() {
    return this._userId;
  }

  get title() {
    return this._title;
  }

  get content() {
    return this._content;
  }

  set title(title: string) {
    this._title = title;
  }

  set content(content: string) {
    this._content = content;
  }
}
