import { Post } from "../entity/post";
import PostRepositoryInterface from "../repository/post-repository.interface";

export default class PostService {
  constructor(private repository: PostRepositoryInterface) {}

  async create(post: Post): Promise<void> {
    return await this.repository.save(post);
  }

  async update(post: Post): Promise<void> {
    return await this.repository.update(post);
  }

  async delete(id: number): Promise<void> {
    return await this.repository.delete(id);
  }

  async findAll(): Promise<Post[]> {
    return await this.repository.findAll();
  }

  async findById(id: number): Promise<Post> {
    return await this.repository.findById(id);
  }
}
