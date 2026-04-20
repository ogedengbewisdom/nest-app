import { MigrationInterface, QueryRunner } from "typeorm";

export class CategoryTable1776530544591 implements MigrationInterface {
    name = 'CategoryTable1776530544591'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "category"`);
        await queryRunner.query(`DROP TYPE "public"."products_category_enum"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "category_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "rating" numeric(3,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "rating_check" CHECK (rating >= 0 AND rating <= 5)`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_9a5f6868c96e0069e699f33e124" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_9a5f6868c96e0069e699f33e124"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "rating_check"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "rating" double precision NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "category_id"`);
        await queryRunner.query(`CREATE TYPE "public"."products_category_enum" AS ENUM('electronics', 'clothing', 'jewellery')`);
        await queryRunner.query(`ALTER TABLE "products" ADD "category" "public"."products_category_enum" NOT NULL`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
