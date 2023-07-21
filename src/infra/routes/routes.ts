import { Router } from "express";
import PostController from "../post/controller/post.controller";
import UserController from "../user/controller/user.controller";

const routes = Router();

routes.post("/users", (req, res) => new UserController(req, res).create());
routes.get("/users/:id", (req, res) => new UserController(req, res).findById());
routes.get("/users", (req, res) => new UserController(req, res).findAll());
routes.put("/users/:id", (req, res) => new UserController(req, res).update());
routes.delete("/users/:id", (req, res) =>
  new UserController(req, res).delete()
);

routes.post("/posts", (req, res) => new PostController(req, res).create());
routes.get("/posts/:id", (req, res) => new PostController(req, res).findById());
routes.get("/posts", (req, res) => new PostController(req, res).findAll());
routes.put("/posts/:id", (req, res) => new PostController(req, res).update());
routes.delete("/posts/:id", (req, res) =>
  new PostController(req, res).delete()
);

export default routes;
