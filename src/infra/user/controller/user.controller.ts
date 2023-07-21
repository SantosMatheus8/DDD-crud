import { Request, Response } from "express";
import UserService from "../../../domain/user/service/user.service";
import { User } from "../../../domain/user/entity/user";
import UserRepository from "../repository/typeorm/user.repository";

export default class UserController {
  private _req: Request;
  private _res: Response;

  constructor(req: Request, res: Response) {
    this._req = req;
    this._res = res;
  }

  private repository = new UserRepository();
  private userService = new UserService(this.repository);

  public async create(): Promise<void> {
    const { name, email, password } = this._req.body;

    const user = new User(name, email, password);
    await this.userService.create(user);

    this._res.status(201).send();
  }

  public async findById(): Promise<void> {
    const { id } = this._req.params;

    const user = await this.userService.findById(Number(id));

    this._res.status(201).send(user);
  }

  public async findAll(): Promise<void> {
    const users = await this.userService.findAll();

    this._res.status(201).send(users);
  }

  public async update(): Promise<void> {
    const { id } = this._req.params;
    const { name, email, password } = this._req.body;

    const user = new User(name, email, password, Number(id));
    await this.userService.update(user);

    this._res.status(201).send();
  }

  public async delete(): Promise<void> {
    const { id } = this._req.params;

    await this.userService.delete(Number(id));

    this._res.status(201).send();
  }
}
