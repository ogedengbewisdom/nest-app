import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Max,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { ProductCategory } from '../enums/product-category.enum';
import { Type } from 'class-transformer';
import { ProductPropertyDto } from './product-property.dto';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  name: string;

  @IsNumber()
  @Min(20)
  @IsPositive()
  price: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(20)
  description: string;

  @IsUrl()
  imageUrl: string;

  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductPropertyDto)
  properties?: ProductPropertyDto[];

  @IsBoolean()
  inStock: boolean;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  category_id: number;
}
