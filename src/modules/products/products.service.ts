import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CategoryService } from '../category/category.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productRepository: Repository<Products>,
    private readonly categoryService: CategoryService,
  ) {}

  async findAll() {
    try {
      const products = await this.productRepository.find({
        relations: ['owner', 'category'],
        select: {
          id: true,
          name: true,
          price: true,
          description: true,
          inStock: true,
          category: {
            id: true,
            name: true,
            description: true,
          },
          createdAt: true,
          updatedAt: true,
          imageUrl: true,
          rating: true,
          properties: true,
          owner: {
            id: true,
          },
        },
      });
      return products;
    } catch (error) {
      throw new InternalServerErrorException(
        error?.message || 'Failed to fetch products',
      );
    }
  }

  // findRandom() {
  //   return this.random;
  // }

  async findOne(id: number) {
    try {
      const product = await this.productRepository.findOne({
        where: { id },
        relations: ['owner', 'category'],
        select: {
          id: true,
          name: true,
          price: true,
          description: true,
          inStock: true,
          category: {
            id: true,
            name: true,
            description: true,
          },
          imageUrl: true,
          rating: true,
          properties: true,
          createdAt: true,
          updatedAt: true,
          owner: {
            id: true,
          },
        },
      });
      return product;
    } catch (error) {
      throw new InternalServerErrorException(
        error?.message || 'Failed to fetch product',
      );
    }
  }

  async create(createProductDto: CreateProductDto, userId: number) {
    const category = await this.categoryService.findOne(
      createProductDto.category_id,
    );
    try {
      const newProduct = this.productRepository.create({
        ...createProductDto,
        owner: { id: userId },
        category: category,
      });
      await this.productRepository.save(newProduct);
      return newProduct;
    } catch (error) {
      throw new InternalServerErrorException(
        error?.message || 'Failed to create product',
      );
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto, userId: number) {
    const existingProduct = await this.findOne(id);
    if (!existingProduct) throw new NotFoundException('Product not found');
    if (existingProduct.owner.id !== userId)
      throw new ForbiddenException(
        'You are not authorized to update this product',
      );

    if (updateProductDto.category_id) {
      const category = await this.categoryService.findOne(
        updateProductDto.category_id,
      );

      if (!category)
        throw new NotFoundException(
          `Category with id ${updateProductDto.category_id} not found`,
        );
    }

    try {
      await this.productRepository.update(id, updateProductDto);
      return await this.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(
        error?.message || 'Failed to update product',
      );
    }
  }

  async remove(id: number, userId: number) {
    const existingProduct = await this.findOne(id);
    if (!existingProduct) throw new NotFoundException('Product not found');
    if (existingProduct.owner.id !== userId)
      throw new ForbiddenException(
        'You are not authorized to delete this product',
      );
    try {
      await this.productRepository.delete(id);
      return existingProduct.id;
    } catch (error) {
      throw new InternalServerErrorException(
        error?.message || 'Failed to delete product',
      );
    }
  }
}
