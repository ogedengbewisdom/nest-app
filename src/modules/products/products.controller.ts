import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Request,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DeleteProductDto } from './dto/delete-product.dto';
import { Public } from '../auth/decorator/public.decorator';

@Controller('products')
@UsePipes(new ValidationPipe())
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Public()
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const products = await this.productsService.findAll();

    return {
      message: 'Products fetched successfully',
      data: products,
    };
  }

  @Public()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const product = await this.productsService.findOne(id);

    if (!product) throw new NotFoundException('Product not found');

    return {
      message: 'Product fetched successfully',
      data: product,
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Request() req, @Body() createProductDto: CreateProductDto) {
    const userId = req.user.sub;
    const newProduct = await this.productsService.create(
      createProductDto,
      userId,
    );

    return {
      message: 'Product created successfully',
      data: newProduct,
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Request() req,
    @Param() param: DeleteProductDto,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const userId = req.user.sub;
    const { id } = param;
    console.log('id', id);
    const updatedProduct = await this.productsService.update(
      id,
      updateProductDto,
      userId,
    );

    return {
      message: 'Product updated successfully',
      data: updatedProduct,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Request() req, @Param() param: DeleteProductDto) {
    const userId = req.user.sub;
    const { id } = param;
    const removedProduct = await this.productsService.remove(id, userId);

    return {
      message: 'Product removed successfully',
      data: removedProduct,
    };
  }
}
