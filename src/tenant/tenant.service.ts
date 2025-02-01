import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tenant } from 'src/schemas/tenant.schema';

@Injectable()
export class TenantService {
  constructor(
    @InjectModel(Tenant.name) private readonly tenantModel: Model<Tenant>,
  ) {}

  async getTenantById(tenantId: string) {
    return this.tenantModel.findOne({ tenantId });
  }
}
