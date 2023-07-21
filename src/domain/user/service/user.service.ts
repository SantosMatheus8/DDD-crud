import { User } from "../entity/user";
import UserRepositoryInterface from "../repository/user-repository.interface";

export default class UserService {
  constructor(private repository: UserRepositoryInterface) {}

  async create(user: User): Promise<void> {
    return await this.repository.save(user);
  }

  async update(user: User): Promise<void> {
    return await this.repository.update(user);
  }

  async delete(id: number): Promise<void> {
    return await this.repository.delete(id);
  }

  async findAll(): Promise<User[]> {
    return await this.repository.findAll();
  }

  async findById(id: number): Promise<User> {
    return await this.repository.findById(id);
  }
}
