import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const start = Date.now();

    // console.log({
    //   method: req.method,
    //   originalUrl: req.originalUrl,
    //   ip: req.ip
    // })
    console.log(`[${req.method}] ${req.originalUrl} ${req.ip}`);

    res.on('finish', () => {
      const duration = Date.now() - start;
      console.log(`[${req.method}] ${req.originalUrl} ${req.ip} ${res.statusCode} ${duration}ms`);
    })
    next();
  }
}
