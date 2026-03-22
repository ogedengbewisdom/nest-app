import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProductFields1774142932583 implements MigrationInterface {
    name = 'AddProductFields1774142932583'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "rating" double precision NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "products" ADD "imageUrl" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "products" ADD "properties" jsonb NOT NULL DEFAULT '[]'`);
        await queryRunner.query(`ALTER TYPE "public"."products_category_enum" RENAME TO "products_category_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."products_category_enum" AS ENUM('electronics', 'clothing', 'jewellery')`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "category" TYPE "public"."products_category_enum" USING "category"::"text"::"public"."products_category_enum"`);
        await queryRunner.query(`DROP TYPE "public"."products_category_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."products_category_enum_old" AS ENUM('electronics', 'clothing')`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "category" TYPE "public"."products_category_enum_old" USING "category"::"text"::"public"."products_category_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."products_category_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."products_category_enum_old" RENAME TO "products_category_enum"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "properties"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "imageUrl"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "rating"`);
    }

}
