import { Post } from "../../../domain/post/entity/post";
import PostService from "../../../domain/post/service/post.service";
import PostRepository from "../repository/typeorm/post.repository";
import { Request, Response } from "express";

export default class PostController {
  private _req: Request;
  private _res: Response;

  constructor(req: Request, res: Response) {
    this._req = req;
    this._res = res;
  }

  private repository = new PostRepository();
  private postService = new PostService(this.repository);

  public async create(): Promise<void> {
    const { title, content, authorId } = this._req.body;

    const post = new Post(title, content, authorId);
    await this.postService.create(post);

    this._res.status(201).send();
  }

  public async findById(): Promise<void> {
    const { id } = this._req.params;

    const post = await this.postService.findById(Number(id));

    this._res.status(201).send(post);
  }

  public async findAll(): Promise<void> {
    const posts = await this.postService.findAll();

    this._res.status(201).send(posts);
  }

  public async update(): Promise<void> {
    const { id } = this._req.params;
    const { title, content, userId } = this._req.body;

    const post = new Post(title, content, userId, Number(id));
    await this.postService.update(post);

    this._res.status(201).send();
  }

  public async delete(): Promise<void> {
    const { id } = this._req.params;

    await this.postService.delete(Number(id));

    this._res.status(201).send();
  }
}
