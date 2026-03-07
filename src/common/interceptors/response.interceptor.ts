// import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
// import { map, Observable } from 'rxjs';
// import { ApiResponse } from 'src/modules/products/entities/product.entity';
// import {  Response } from 'express';

import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Response } from 'express';
import { map, Observable } from 'rxjs';
import { ApiResponse } from 'src/modules/products/entities/product.entity';


// @Injectable()
// export class ResponseInterceptor<T> implements NestInterceptor {
//     intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
//         const ctx = context.switchToHttp();
//         const response = ctx.getResponse<Response>();
//         const statusCode= response.statusCode;

//         return next.handle().pipe(map((data: { message: string, data: T }) => {
//             return {
//                 statusCode,
//                 success: true,
//                 status: 'success',
//                 message: data.message,
//                 data: data.data,
//                 timestamp: new Date().toISOString(),
//             }
//         }))
//     }
// }

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler) : Observable<ApiResponse<T>> {

        const response = context.switchToHttp().getResponse<Response>();
        const statusCode = response.statusCode;

        return next.handle().pipe(map((data: { message: string, data: T }) => {
            return {
                status: 'success',
                statusCode,
                success: true,
                message: data.message || 'Operation successful',
                data: data.data,
                timestamp: new Date().toISOString(),
            }
        }))
    }
}