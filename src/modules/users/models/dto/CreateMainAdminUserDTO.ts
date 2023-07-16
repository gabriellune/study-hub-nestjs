import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { UsersType } from '../enums/UsersTypeEnum';

export class CreateMainAdminUser {
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
    description: 'The avatar of the user',
    example: 'avatar',
  })
  @ApiProperty({
    description: 'The type of the user',
    example: 'ADMIN',
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
  @IsNotEmpty()
  @IsString()
  password: string;

  id?: string;
}
