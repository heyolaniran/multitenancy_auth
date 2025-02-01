import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class TenantConnectionService {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  private getTenantConnection(tenantId: string): Connection {
    const tenant_db = `tenant_${tenantId}`;

    return this.connection.useDb(tenant_db);
  }

  async getTenantModel({ name, schema }, tenantId: string) {
    const tenantConnection = this.getTenantConnection(tenantId);

    return tenantConnection.model(name, schema);
  }
}
