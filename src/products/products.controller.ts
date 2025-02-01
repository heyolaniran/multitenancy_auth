import { Controller, Get, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { TenantAuthGuard } from 'src/guards/tenant-auth.guard';

@UseGuards(TenantAuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get('')
  async getProducts() {
    return this.productService.getProducts();
  }
}
