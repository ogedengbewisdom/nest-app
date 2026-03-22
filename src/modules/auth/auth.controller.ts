import {
  Controller,
  Post,
  Body,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from './decorator/public.decorator';
import { Throttle } from '@nestjs/throttler';

// @Controller('auth')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    const user = await this.authService.signup(signupDto);
    return {
      message: 'signup successful',
    };
  }

  @Public()
  @Post('login')
  @Throttle({ default: { limit: 3, ttl: 60 * 1000 } })
  async login(@Body() loginDto: LoginDto) {
    const token = await this.authService.login(loginDto);
    return {
      message: 'login successful',
      data: token,
    };
  }
}
