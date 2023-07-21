import { User } from "./user";

describe("User unit tests", () => {
  it("should create a user", () => {
    const user = new User("Matt", "mat@gmail.com", "123");

    expect(user).toBeInstanceOf(User);
    expect(user.name).toBe("Matt");
  });

  it("should throw an error if name is empty", () => {
    expect(() => {
      new User("", "mat@gmail.com", "123");
    }).toThrowError("Name is required");
  });

  it("should throw an error if email is empty", () => {
    expect(() => {
      new User("Matt", "", "123");
    }).toThrowError("Email is required");
  });

  it("should throw an error if password is empty", () => {
    expect(() => {
      new User("Matt", "mat@gmail.com", "");
    }).toThrowError("Password is required");
  });
});
