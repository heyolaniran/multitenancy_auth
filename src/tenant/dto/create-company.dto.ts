import { IsString } from 'class-validator';
import { UserDTO } from 'src/users/dto/user.dto';

export class CreateCompanyDTO {
  @IsString()
  name: string;

  user: UserDTO;
}
