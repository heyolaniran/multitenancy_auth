import { Connection } from 'mongoose';
import { Products, ProductSchema } from 'src/schemas/product.schema';

export const tenantModels = {
  productModel: {
    provide: 'PRODUCT_MODEL',
    useFactory: async (tenantConnection: Connection) => {
      return tenantConnection.model(Products.name, ProductSchema);
    },
    inject: ['TENANT_CONNECTION'],
  },
};
