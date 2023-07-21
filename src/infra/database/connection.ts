import { DataSource } from "typeorm";
import "dotenv/config";
import { CreateUserTable1688384388551 } from "./migrations/1688384388551-create-user-table";
import { CreatePostTable1688384510556 } from "./migrations/1688384510556-create-post-table";

const connectToDatabase = new DataSource({
  type: "mysql",
  host: "localhost",
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  // entities: [__dirname + "/../**/*.entity.js"],
  // entities: [__dirname + "/**/**/**/**/**/*.entity.js"],
  entities: [__dirname + "/../**/*.entity.{js,ts}"],
  synchronize: false,
  migrations: [CreateUserTable1688384388551, CreatePostTable1688384510556],
});

export default connectToDatabase;
