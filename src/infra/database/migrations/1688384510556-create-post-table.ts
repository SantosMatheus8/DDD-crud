import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePostTable1688384510556 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "posts",
        columns: [
          {
            name: "id",
            type: "int",
            isGenerated: true,
            generationStrategy: "increment",
            isPrimary: true,
          },
          {
            name: "title",
            type: "varchar",
          },
          {
            name: "content",
            type: "varchar",
          },
          {
            name: "author_id",
            type: "int",
          },
        ],
        foreignKeys: [
          {
            name: "FKAuthor",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["author_id"],
            onDelete: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("posts");
  }
}
