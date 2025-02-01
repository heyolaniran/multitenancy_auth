import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Products } from 'src/schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCT_MODEL') private readonly productModel: Model<Products>,
  ) {}

  async getProducts() {
    return this.productModel.find();
  }
}
