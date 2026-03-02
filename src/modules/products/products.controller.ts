import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    const products =  this.productsService.findAll();

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Products fetched successfully',
      data: products,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    const productId = Number(id);
    const product = this.productsService.findOne(productId);

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Product fetched successfully',
      data: product,
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProductDto: CreateProductDto) {
    const newProduct = this.productsService.create(createProductDto);

    return {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Product created successfully',
      data: newProduct,
    };
  }


  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    const updatedProduct = this.productsService.update(+id, updateProductDto);

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    const removedProduct = this.productsService.remove(+id);

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Product removed successfully',
      data: removedProduct,
    };
  }
}
