import { ApiProperty } from '@nestjs/swagger';

export class ReqResUser {
  @ApiProperty({
    description: 'The id of the user',
    example: 0,
  })
  id: number;

  @ApiProperty({
    description: 'The first name of the user',
    example: 'first_name',
  })
  first_name: string;

  @ApiProperty({
    description: 'The last name of the user',
    example: 'last_name',
  })
  last_name: string;

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
}
