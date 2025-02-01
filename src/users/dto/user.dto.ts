import { IsEmail, IsString, Matches } from 'class-validator';

export class UserDTO {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
