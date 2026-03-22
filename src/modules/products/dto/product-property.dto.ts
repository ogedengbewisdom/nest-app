import { IsNotEmpty, IsString } from 'class-validator';

export class ProductPropertyDto {
    @IsString()
    @IsNotEmpty()
    color: string;
  
    @IsString()
    @IsNotEmpty()
    weight: string;
  }