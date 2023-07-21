import UserRepositoryInterface from "../../../../domain/user/repository/user-repository.interface";
import { Repository } from "typeorm";
import { User } from "../../../../domain/user/entity/user";
import connectToDatabase from "../../../../infra/database/connection";
import { UserEntity } from "./user.entity";

export default class UserRepository implements UserRepositoryInterface {
  private repository: Repository<UserEntity>;

  constructor() {
    this.repository = connectToDatabase.getRepository(UserEntity);
  }

  public async save(user: User): Promise<void> {
    await this.repository.save({
      email: user.email,
      name: user.name,
      password: user.password,
    });
  }

  public async update(user: User): Promise<void> {
    const model = await this.repository.findOne({ where: { id: user.id } });

    if (!model) {
      throw new Error("User not found");
    }

    model.name = user.name;
    model.email = user.email;
    model.password = user.password;
    await this.repository.save(model);
  }

  public async findById(id: number): Promise<User> {
    const model = await this.repository.findOne({ where: { id } });

    if (!model) {
      throw new Error("User not found");
    }

    return new User(model.name, model.email, model.password);
  }

  public async findAll(): Promise<User[]> {
    const models = await this.repository.find();

    return models.map((model) => {
      return new User(model.name, model.email, model.password, model.id);
    });
  }

  public async delete(id: number): Promise<void> {
    const model = await this.repository.findOne({ where: { id } });

    if (!model) {
      throw new Error("User not found");
    }

    await this.repository.remove(model);
  }
}
