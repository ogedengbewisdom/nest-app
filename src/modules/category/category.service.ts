import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService implements OnModuleInit {
  constructor(
    @InjectRepository(Category)
    private readonly category_repository: Repository<Category>,
  ) {}

  async onModuleInit() {
    await this.seed_categories();
  }

  private async seed_categories() {
    console.log('checking categories...');
    const categories = await this.category_repository.count();
    if (categories === 0) {
      console.log('no categories found, seeding...');
      const categories_to_seed = [
        { name: 'Electronics', description: 'Electronic devices and gadgets' },
        { name: 'Clothing', description: 'Fashion and apparel' },
        { name: 'Food & Beverages', description: 'Edible products and drinks' },
        { name: 'Books', description: 'Books and literature' },
        { name: 'Sports', description: 'Sports and fitness equipment' },
      ];

      await this.category_repository.save(categories_to_seed);
      console.log('categories seeded successfully');
    } else {
      console.log('categories already exist, skipping seeding');
    }
  }
  async findAll() {
    const categories = await this.category_repository.find();
    return categories.map((category) => ({
      id: category.id,
      name: category.name,
      description: category.description,
    }));
  }

  async findOne(id: number) {
    const category = await this.category_repository.findOne({ where: { id } });
    if (!category)
      throw new NotFoundException(`Category with id ${id} not found`);

    return category;
  }
}
