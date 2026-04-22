import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const header = req.headers['authorization'];

    if (!header)
      throw new UnauthorizedException('header authorization is required');

    const token = header.split(' ')[1];
    const fakeToken = process.env.FAKE_TOKEN as string;
    if (token !== fakeToken) throw new UnauthorizedException('invalid token');

    req.user = { id: 1, name: 'John Doe', email: 'john.doe@example.com' };
    next();
  }
}
