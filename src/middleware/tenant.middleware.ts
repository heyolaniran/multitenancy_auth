import {
  BadGatewayException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request } from 'express';
import { TenantService } from 'src/tenant/tenant.service';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(private readonly tenantService: TenantService) {}
  use(req: Request, res: any, next: () => void) {
    const tenantId = req.headers['x-tenant-id']?.toString();

    if (!tenantId) {
      throw new BadGatewayException('Tenant not found');
    }

    const record = this.tenantService.getTenantById(tenantId);

    if (!record)
      throw new BadGatewayException('Authorized Action from database');

    console.log('Tenant', tenantId);

    req['tenantId'] = tenantId;
    next();
  }
}
