import UserRepository from "../../../infra/user/repository/typeorm/user.repository";
import { User } from "../entity/user";
import UserService from "./user.service";

describe("UserService", () => {
  let userService: UserService;
  let userRepository: UserRepository;

  const userReturn = {
    id: 1,
    name: "name",
    email: "email",
    password: "password",
  };

  beforeEach(() => {
    userRepository = new UserRepository();
    userService = new UserService(userRepository);
  });

  it("should be defined", () => {
    expect(userService).toBeDefined();
  });

  it("should create a user", async () => {
    userRepository.save = jest.fn().mockResolvedValueOnce(userReturn);
    userRepository.findAll = jest.fn().mockResolvedValueOnce([userReturn]);

    const user = new User("name", "email", "password");
    await userService.create(user);

    const users = await userService.findAll();

    expect(userReturn.name).toBe(users[0].name);
    expect(userRepository.save).toHaveBeenCalledTimes(1);
    expect(users.length).toBe(1);
  });

  it("should update a user", async () => {
    const userReturn = {
      id: 1,
      name: "updatedName",
      email: "email",
      password: "password",
    };
    userRepository.update = jest.fn().mockResolvedValueOnce(userReturn);
    userRepository.findAll = jest.fn().mockResolvedValueOnce([userReturn]);

    const user = new User("updatedName", "email", "password");
    await userService.update(user);

    const users = await userService.findAll();

    expect(users[0].name).toBe("updatedName");
    expect(userRepository.update).toHaveBeenCalledTimes(1);
  });

  it("should find a user by id", async () => {
    userRepository.findById = jest.fn().mockResolvedValueOnce(userReturn);

    const user = await userService.findById(1);

    expect(user.name).toBe("name");
    expect(userRepository.findById).toHaveBeenCalledTimes(1);
  });

  it("should find all users", async () => {
    userRepository.findAll = jest.fn().mockResolvedValueOnce([userReturn]);

    const users = await userService.findAll();

    expect(users[0].name).toBe("name");
    expect(userRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it("should delete a user", async () => {
    userRepository.delete = jest.fn().mockResolvedValueOnce(null);

    await userService.delete(1);

    expect(userRepository.delete).toHaveBeenCalledTimes(1);
  });
});
