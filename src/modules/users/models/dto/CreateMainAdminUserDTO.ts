import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDTO } from './CreateUserDTO';
import { OmitType } from '@nestjs/mapped-types';

export class CreateMainAdminUser extends OmitType(CreateUserDTO, [
  'password',
] as const) {
  @IsNotEmpty()
  @IsString()
  password: string;
}
