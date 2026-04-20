import { Users } from '../../users/entities/user.entity';
import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductProperty } from '../interface/product-interface';
import { Category } from '../../category/entities/category.entity';

@Entity()
export class Products {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('float')
  price: number;

  @Column()
  description: string;

  @Column({ default: true })
  inStock: boolean;

  // @Column({ type: 'enum', enum: ProductCategory })
  // category: ProductCategory;

  @Column()
  category_id: number;

  @ManyToOne(() => Users, (user) => user.products)
  // @JoinColumn({ name: 'ownerId' })
  owner: Users;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({ type: 'decimal', precision: 3, scale: 2, default: 0 })
  @Check('rating_check', 'rating >= 0 AND rating <= 5')
  rating: number;

  @Column({ default: '' })
  imageUrl: string;

  @Column({ type: 'jsonb', default: '[]' })
  properties: ProductProperty[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
