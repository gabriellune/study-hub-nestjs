import { ApiProperty } from '@nestjs/swagger';

export class LoginResponse {
  @ApiProperty({
    description: 'The token to user another routes',
    example: 'token',
  })
  accessToken: string;
}
