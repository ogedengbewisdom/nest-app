import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../../modules/products/interface/product-interface';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    const response = context.switchToHttp().getResponse<Response>();
    const statusCode = response.statusCode;

    return next.handle().pipe(
      map((data: { message: string; data: T }) => {
        return {
          status: 'success',
          statusCode,
          success: true,
          message: data.message || 'Success',
          ...(data.data && { data: data.data }),
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }
}
