import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @Matches(/^0\d{10}$/, {
    message: 'Phone number must be 11 digits and start with 0',
  })
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
