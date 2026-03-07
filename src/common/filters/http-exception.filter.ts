

import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse<Response>();
        const status = exception.getStatus();
        const exceptionResponse = exception.getResponse() as any;

        const errorCode = exceptionResponse?.error.toUpperCase().replace(/ /g, '_')

        response.status(status).json({
            statusCode: status,
            success: false,
            status: 'error',
            error: {
                code: errorCode,
                message: exceptionResponse?.message || exception.message
            },
            timestamp: new Date().toISOString()
        })
    }
}