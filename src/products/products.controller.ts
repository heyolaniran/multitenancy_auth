import { Controller, Get, Inject, Req } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Connection } from 'mongoose';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get('')
  async getProducts() {
    return this.productService.getProducts();
  }
}
