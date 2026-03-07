import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {

  private products: Product[] = [];
  private autoIncrementId = 1;

  // private random = Math.floor(Math.random()  * 100) + 1;

  findAll() {

    return this.products;

  }

  // findRandom() {
  //   return this.random;
  // }

  findOne(id: number) {

    const product = this.products.find((prd) => prd.id === id);

    if (!product) {

      throw new NotFoundException('Product not found');

    }

    return product;
  }

  create(createProductDto: CreateProductDto, userId: number) {
    const newProduct = {
      id: this.autoIncrementId++,
      ...createProductDto,
      userId: userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.products = [...this.products, newProduct]

    return newProduct;
  }

  update(id: number, updateProductDto: UpdateProductDto) {

    const existingProduct = this.findOne(id);

    const updatedProduct = {...existingProduct, ...updateProductDto, updatedAt: new Date().toISOString()}

    this.products = this.products.map((prd) => prd.id === id ? updatedProduct : prd)

    return updatedProduct;

  }

  remove(id: number) {

    const existingProduct = this.findOne(id);

    this.products = this.products.filter((prd) => prd.id !== id);

    return existingProduct

  }
}


// export const productService = new ProductsService();