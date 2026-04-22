import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Users } from './modules/users/entities/user.entity';
import { Products } from './modules/products/entities/product.entity';
import { Category } from './modules/category/entities/category.entity';
dotenv.config();

const is_production = process.env.NODE_ENV === 'production';

export default new DataSource(
  is_production
    ? {
        type: 'postgres',
        url: process.env.DATABASE_URL,
        entities: [Users, Products, Category],
        // entities: ['src/**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        synchronize: false,
        // ssl: {
        //   rejectUnauthorized: false,
        // },
      }
    : {
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT as string),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [Users, Products, Category],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        synchronize: false,
      },
);
