import { Users } from '../../users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductCategory } from '../enums/product-category.enum';
import { ProductProperty } from '../interface/product-interface';

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

  @Column({ type: 'enum', enum: ProductCategory })
  category: ProductCategory;

  @ManyToOne(() => Users, (user) => user.products)
  // @JoinColumn({ name: 'ownerId' })
  owner: Users;

  @Column({ type: 'float', default: 0 })
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
