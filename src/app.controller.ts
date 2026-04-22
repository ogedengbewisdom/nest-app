import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './modules/auth/decorator/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getHello(): object {
    return this.appService.getHello();
  }

  @Public()
  @Get('health')
  healthCheck(): object {
    return this.appService.healthCheck();
  }
}
