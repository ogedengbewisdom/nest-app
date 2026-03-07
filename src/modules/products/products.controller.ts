import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Header, Request } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DeleteProductDto } from './dto/delete-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  // @Header('X-custom-header', 'Wisdom welcome to NestJS!')
  @HttpCode(HttpStatus.OK)
  findAll(){
    const products =  this.productsService.findAll();

    return {
      message: 'Products fetched successfully',
      data: products,
    };
  }

  // @Get('random')
  // @HttpCode(HttpStatus.OK)
  //   findRandom() {
  //   // const random = new ProductsService();
  //   // const randomProduct = productService.findRandom();
  //   return {
  //     message: 'Random product fetched successfully',
  //     data: this.productsService.findRandom(),
  //   };
  // }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    const productId = Number(id);
    const product = this.productsService.findOne(productId);

    return {
      message: 'Product fetched successfully',
      data: product,
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Request() req,@Body() createProductDto: CreateProductDto) {

    const userId = req.user.id
    const newProduct = this.productsService.create(createProductDto, userId);

    return {
      message: 'Product created successfully',
      data: newProduct,
    };
  }


  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto){
    const updatedProduct = this.productsService.update(+id, updateProductDto);

    return {
      message: 'Product updated successfully',
      data: updatedProduct
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param() param: DeleteProductDto){
    const {id} = param
    const removedProduct = this.productsService.remove(id);

    return {
      message: 'Product removed successfully',
      data: removedProduct,
    };
  }
}
