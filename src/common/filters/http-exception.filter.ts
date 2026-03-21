import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as any;

    const errorCode = exceptionResponse?.error
      ?.toUpperCase()
      .replace(/ /g, '_');

    response.status(status).json({
      statusCode: status,
      success: false,
      status: 'error',
      path: request.originalUrl,
      method: request.method,
      error: {
        code: errorCode ?? 'UNKNOWN_ERROR',
        message: exceptionResponse?.message || exception.message,
      },
      timestamp: new Date().toISOString(),
    });
  }
}
