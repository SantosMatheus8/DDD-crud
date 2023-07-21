import { Post } from "./post";

describe("Post unit tests", () => {
  it("should create a post", () => {
    const post = new Post("title", "content", 1);

    expect(post).toBeInstanceOf(Post);
    expect(post.title).toBe("title");
  });

  it("should throw an error if title is empty", () => {
    expect(() => {
      new Post("", "content", 1);
    }).toThrowError("Title is required");
  });

  it("should throw an error if content is empty", () => {
    expect(() => {
      new Post("title", "", 1);
    }).toThrowError("Content is required");
  });

  it("should throw an error if userId is empty", () => {
    expect(() => {
      new Post("title", "content", null);
    }).toThrowError("UserId is required");
  });
});
