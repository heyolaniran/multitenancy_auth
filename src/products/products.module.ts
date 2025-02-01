import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Products, ProductSchema } from 'src/schemas/product.schema';
import { TenantMiddleware } from 'src/middleware/tenant.middleware';
import { tenantConnectionProvider } from 'src/providers/tenant-connection.provider';
import { tenantModels } from 'src/providers/tenant-models.provider';

@Module({
  imports: [
    /* MongooseModule.forFeature([
      {
        name: Products.name,
        schema: ProductSchema,
      },
    ]),
  */
  ],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    tenantConnectionProvider,
    tenantModels.productModel,
  ],
})
export class ProductsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes(ProductsController);
  }
}
