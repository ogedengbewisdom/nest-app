import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {

    const header = req.headers['authorization'];

    if (!header) throw new UnauthorizedException('header authorization is required');

    const token = header.split(' ')[1];
    if (token && token !== 'my-sample-token') throw new UnauthorizedException('invalid token');
    
    req.user = {id: 1, name: 'John Doe', email: 'john.doe@example.com'};
    next();
  }
}
