import PostRepositoryInterface from "../../../../domain/post/repository/post-repository.interface";
import { Repository } from "typeorm";
import { Post } from "../../../../domain/post/entity/post";
import { PostEntity } from "./post.entity";
import connectToDatabase from "../../../../infra/database/connection";

export default class PostRepository implements PostRepositoryInterface {
  private repository: Repository<PostEntity>;

  constructor() {
    this.repository = connectToDatabase.getRepository(PostEntity);
  }

  public async save(post: Post): Promise<void> {
    await this.repository.save({
      content: post.content,
      title: post.title,
      authorId: post.userId,
    });
  }

  public async update(post: Post): Promise<void> {
    const model = await this.repository.findOne({
      where: { id: post.id },
    });

    if (!model) {
      throw new Error("Post not found");
    }

    model.title = post.title;
    model.content = post.content;

    await this.repository.save(model);
  }

  public async findById(id: number): Promise<Post> {
    const model = await this.repository.findOne({ where: { id } });

    if (!model) {
      throw new Error("Post not found");
    }

    return new Post(model.title, model.content, model.authorId, model.id);
  }

  public async findAll(): Promise<Post[]> {
    const models = await this.repository.find();

    return models.map((model) => {
      return new Post(model.title, model.content, model.authorId, model.id);
    });
  }

  public async delete(id: number): Promise<void> {
    const model = await this.repository.findOne({ where: { id } });

    if (!model) {
      throw new Error("Post not found");
    }

    await this.repository.remove(model);
  }
}
