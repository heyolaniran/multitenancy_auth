import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tenant } from 'src/schemas/tenant.schema';
import { CreateCompanyDTO } from './dto/create-company.dto';
import { UsersService } from 'src/users/users.service';
import { nanoid } from 'nanoid';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class TenantService {
  constructor(
    @InjectModel(Tenant.name) private readonly tenantModel: Model<Tenant>,
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  async getTenantById(tenantId: string) {
    return this.tenantModel.findOne({ tenantId });
  }

  async createCompany(company: CreateCompanyDTO) {
    // Verify user does not already exist

    const user = await this.userService.getUserByEmail(company.user.email);

    if (user) {
      throw new UnauthorizedException(
        'User already exists and belong to a company....',
      );
    }

    // create a tenant id

    const tenantId = nanoid(12);

    // create tenant Secret
    await this.authService.createSecretKeyForNewTenant(tenantId);

    // Create a new user
    await this.userService.create(company.user, tenantId);

    // Create tenant record

    const tenant = await this.tenantModel.create({
      companyName: company.name,
      tenantId: tenantId,
    });

    tenant.save();

    return tenant;
  }
}
