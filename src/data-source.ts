import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Users } from './modules/users/entities/user.entity';
import { Products } from './modules/products/entities/product.entity';
import { Category } from './modules/category/entities/category.entity';
dotenv.config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: parseInt(process.env.DB_PORT ?? '5432'),
  username: process.env.DB_USERNAME ?? 'postgres',
  password: process.env.DB_PASSWORD ?? '1234',
  database: process.env.DB_NAME ?? 'product_api_db',
  entities: [Users, Products, Category],
  // migrations: ['src/migrations/*.{ts,js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false,
});
