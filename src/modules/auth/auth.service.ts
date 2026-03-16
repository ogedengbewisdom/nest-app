import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async signup(signupDto: SignupDto) {
    try {
      const existingUser = await this.usersService.findOneByEmail(
        signupDto.email,
      );

      if (existingUser) throw new BadRequestException('User already exists');

      const hashedPassword = await bcrypt.hash(signupDto.password, 10);

      if (!hashedPassword)
        throw new InternalServerErrorException('Failed to hash password');

      const newUser = await this.usersService.create({
        ...signupDto,
        password: hashedPassword,
      });

      return newUser;
    } catch (error) {
      throw new InternalServerErrorException(
        error?.message || 'Failed to signup',
      );
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const user = await this.usersService.findOneByEmail(loginDto.email);

      if (!user) throw new NotFoundException('Invalid email or password');

      const comparePassword = await bcrypt.compare(
        loginDto.password,
        user.password,
      );

      if (!comparePassword)
        throw new UnauthorizedException('Invalid email or password');

      const payload = { sub: user.id, email: user.email };

      const token = this.jwtService.sign(payload);
      return token;
    } catch (error) {
      throw new InternalServerErrorException(
        error?.message || 'Failed to login',
      );
    }
  }
}
