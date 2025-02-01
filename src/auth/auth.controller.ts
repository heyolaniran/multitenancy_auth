import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialsDTO } from './dto/credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(credentials: CredentialsDTO) {
    return await this.authService.login(credentials);
  }
}
