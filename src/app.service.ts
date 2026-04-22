import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    return { message: 'Welcome to NestJS!' };
  }

  healthCheck(): object {
    return { message: 'OK' };
  }
}
