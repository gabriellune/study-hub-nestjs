import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { UsersType } from '../enums/UsersTypeEnum';

export class CreateUserDTO {
  @IsOptional()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  personalIdentifier: string; //cpf

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  avatar: string;

  @IsNotEmpty()
  @IsEnum(UsersType)
  type: UsersType;

  @IsOptional()
  @IsString()
  courseId: string;

  @ValidateIf((user) => user.type === UsersType.ADMIN)
  @IsNotEmpty()
  password: string;
}
