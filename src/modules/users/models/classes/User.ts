import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({
    description: 'The id of the user',
    example: 'id',
  })
  id: string;

  @ApiProperty({
    description: 'The first name of the user',
    example: 'firstName',
  })
  firstName: string;

  @ApiProperty({
    description: 'The last name of the user',
    example: 'lastName',
  })
  lastName: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'email',
  })
  email: string;

  @ApiProperty({
    description: 'The avatar of the user',
    example: 'avatar',
  })
  avatar: string;

  @ApiProperty({
    description: 'The type of the user',
    example: 'type',
  })
  type: string;

  @ApiProperty({
    description: 'The course id of the user',
    example: 'courseId',
  })
  courseId: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password',
  })
  password: string;

  @ApiProperty({
    description: 'The req res user id of the user',
    example: 'reqResUserId',
  })
  reqResUserId: number;
}
