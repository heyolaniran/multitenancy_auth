import {
  BadGatewayException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { TenantService } from 'src/tenant/tenant.service';
import { decrypt } from 'src/utils/decrypt';

@Injectable()
export class TenantAuthGuard implements CanActivate {
  constructor(
    private readonly tenantService: TenantService,
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.tenantId) {
      throw new UnauthorizedException('Tenant ID  not provided');
    }

    const tenantId = request.tenantId;

    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    const userId = await this.checkTokenValidity(token, tenantId);

    request.userInfo = {
      id: userId,
    };
    return true;
  }

  private async checkTokenValidity(token: string, tenantId: string) {
    try {
      const secret =
        await this.authService.fetchSecretKeyForNewTenant(tenantId);

      const payload = await this.jwtService.verify(token, {
        secret: decrypt(secret, process.env.ENCRYPTION_KEY!),
      });

      return payload.userId;
    } catch (error) {
      throw new UnauthorizedException('');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    return request.headers.authorization.split(' ')[1];
  }
}
