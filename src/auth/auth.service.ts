import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { nanoid } from 'nanoid';
import { TenantConnectionService } from 'src/services/tenant-connection.service';
import { encrypt } from 'src/utils/encrypt';
import { Secrets, SecretSchema } from './schemas/secret.schema';
import { CredentialsDTO } from './dto/credentials.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { UserDTO } from 'src/users/dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { decrypt } from 'src/utils/decrypt';
@Injectable()
export class AuthService {
  constructor(
    private readonly tenantConnectionService: TenantConnectionService,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async createSecretKeyForNewTenant(tenantId: string) {
    // Generate random secret Key
    const jwtSecret = nanoid(128);

    // Encrpypt the SK

    const encrpyptedKey = encrypt(jwtSecret, process.env.ENCRYPTION_KEY!);

    // Get access to the specific tenant Model

    const SecretModel = await this.tenantConnectionService.getTenantModel(
      { name: Secrets.name, schema: SecretSchema },
      tenantId,
    );

    // Store the encrypted key

    await SecretModel.create({ jwtSecret: encrpyptedKey });
  }

  async fetchSecretKeyForNewTenant(tenantId: string) {
    // Get access to the correct tenant model

    const secretModel = await this.tenantConnectionService.getTenantModel(
      { name: Secrets, schema: SecretSchema },
      tenantId,
    );

    // Fetch the secret key for the tenant

    const secretKey = await secretModel.findOne();

    return secretKey.jwtSecret;
  }

  async login(credentials: CredentialsDTO) {
    const { email, password } = credentials;

    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new NotFoundException('No user found');
    }

    // compare the password with the hashed password in the database

    const verify = await bcrypt.compare(password, user.password);

    if (!verify) {
      throw new UnauthorizedException('Wrong credentials');
    }

    // Fetch tenant specific key

    const jwtSecret = await this.fetchSecretKeyForNewTenant(user.tenantId);

    // generate the token access

    const accessToken = await this.generateJwtAccess(
      user._id as string,
      jwtSecret,
    );

    return { accessToken, tenantId: user.tenantId };
  }

  async generateJwtAccess(user_id: string, key: string) {
    return this.jwtService.sign(
      { userId: user_id },
      { secret: decrypt(key, process.env.ENCRYPTION_KEY!), expiresIn: '1h' },
    );
  }
}
