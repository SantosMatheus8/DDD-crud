import { UserEntity } from "../../../user/repository/typeorm/user.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "posts" })
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ name: "author_id" })
  authorId: number;

  @ManyToOne(() => PostEntity, (post) => post.id)
  @JoinColumn({ name: "author_id" })
  user: UserEntity;
}
