import PostRepository from "../../../infra/post/repository/typeorm/post.repository";
import { Post } from "../entity/post";
import PostService from "./post.service";

describe("PostService", () => {
  let postService: PostService;
  let postRepository: PostRepository;

  const postReturn = {
    id: 1,
    title: "title",
    content: "content",
  };

  beforeEach(() => {
    postRepository = new PostRepository();
    postService = new PostService(postRepository);
  });

  it("should be defined", () => {
    expect(postService).toBeDefined();
  });

  it("should create a post", async () => {
    postRepository.save = jest.fn().mockResolvedValueOnce(postReturn);
    postRepository.findAll = jest.fn().mockResolvedValueOnce([postReturn]);

    const post = new Post("title", "content", 1);
    await postService.create(post);

    const posts = await postService.findAll();

    expect(postReturn.title).toBe(posts[0].title);
    expect(postRepository.save).toHaveBeenCalledTimes(1);
    expect(posts.length).toBe(1);
  });

  it("should update a post", async () => {
    const postReturn = {
      id: 1,
      title: "updatedTitle",
      content: "content",
    };
    postRepository.update = jest.fn().mockResolvedValueOnce(postReturn);
    postRepository.findAll = jest.fn().mockResolvedValueOnce([postReturn]);

    const post = new Post("updatedTitle", "content", 1);
    await postService.update(post);

    const posts = await postService.findAll();

    expect(posts[0].title).toBe("updatedTitle");
    expect(postRepository.update).toHaveBeenCalledTimes(1);
  });

  it("should find a post by id", async () => {
    postRepository.findById = jest.fn().mockResolvedValueOnce(postReturn);

    const post = await postService.findById(1);

    expect(post.title).toBe("title");
    expect(postRepository.findById).toHaveBeenCalledTimes(1);
  });

  it("should find all posts", async () => {
    postRepository.findAll = jest.fn().mockResolvedValueOnce([postReturn]);

    const posts = await postService.findAll();

    expect(posts[0].title).toBe("title");
    expect(postRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it("should delete a post", async () => {
    postRepository.delete = jest.fn().mockResolvedValueOnce(postReturn);
    postRepository.findAll = jest.fn().mockResolvedValueOnce([]);

    const post = await postService.delete(1);
    const posts = await postService.findAll();
    expect(posts.length).toBe(0);
    expect(postRepository.delete).toHaveBeenCalledTimes(1);
  });
});
