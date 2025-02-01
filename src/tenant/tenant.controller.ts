import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { CreateCompanyDTO } from './dto/create-company.dto';

@Controller('tenants')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Get('')
  async getTenantById(@Req() { tenantId }) {
    return await this.tenantService.getTenantById(tenantId);
  }

  @Post('/create/company')
  async createCompany(@Body() company: CreateCompanyDTO) {
    return await this.tenantService.createCompany(company);
  }
}
