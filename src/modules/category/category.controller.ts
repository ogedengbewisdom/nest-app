import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Public } from '../auth/decorator/public.decorator';

@Controller({ path: 'category', version: '1' })
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Public()
  @Get()
  async findAll() {
    const categories = await this.categoryService.findAll();
    return {
      message: 'categories fetched successfully',
      data: categories,
    };
  }
}
