import RepositoryInterface from "../../@shared/repository/repository-interface";
import { Post } from "../entity/post";

export default interface PostRepositoryInterface
  extends RepositoryInterface<Post> {}
