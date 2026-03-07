import { IsBoolean, IsEnum, IsInt, IsNumber, IsPositive, IsString, Min, MinLength } from 'class-validator';
import { ProductCategory } from '../enums/product-category.enum';


export class CreateProductDto {

  @IsString()
  @MinLength(4)
  name: string;

  @IsNumber()
  @Min(20)
  @IsPositive()
  price: number;

  @IsString()
  @MinLength(20)
  description: string;

  @IsBoolean()
  inStock: boolean;

  @IsEnum(ProductCategory)
  category: ProductCategory;
}
