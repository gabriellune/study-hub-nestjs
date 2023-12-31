import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { UsersType } from '../enums/UsersTypeEnum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty({
    description: 'The first name of the user',
    example: 'firstName',
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'The last name of the user',
    example: 'lastName',
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'email',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The type of the user',
    example: 'STUDENT || ADMIN',
  })
  @IsNotEmpty()
  @IsEnum(UsersType)
  type: UsersType;

  @ApiProperty({
    description: 'The course id of the user',
    example: 'courseId',
  })
  @IsOptional()
  @IsString()
  courseId: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password',
  })
  @ValidateIf((user) => user.type === UsersType.ADMIN)
  @IsNotEmpty()
  password?: string;

  id?: string;
  avatar?: string;
  reqResUserId?: number;
}
