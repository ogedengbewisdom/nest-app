import {
  MiddlewareConsumer,
  Module,
  NestModule,
  // RequestMethod,
  // ValidationPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './entities/product.entity';
// import { AuthMiddleware } from 'src/common/middleware/auth/auth.middleware';
// import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forFeature([Products])],
  controllers: [ProductsController],
  providers: [
    // {provide:APP_PIPE, useClass: ValidationPipe},
    ProductsService,
  ],
})
export class ProductsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(AuthMiddleware).forRoutes(
    //   { path: 'products', method: RequestMethod.POST },
    //   { path: 'products/:id', method: RequestMethod.PATCH },
    //   { path: 'products/:id', method: RequestMethod.DELETE },
    // )
  }
}
