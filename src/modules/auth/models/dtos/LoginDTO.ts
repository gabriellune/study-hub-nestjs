import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class LoginDTO {
  @IsNotEmpty()
  @IsNumberString()
  personalIdentifier: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
