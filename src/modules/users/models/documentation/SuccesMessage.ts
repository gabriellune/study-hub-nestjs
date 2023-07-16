import { ApiProperty } from '@nestjs/swagger';

export class SuccessMessage {
  @ApiProperty({
    description: 'success message',
    example: 'success',
  })
  message: string;
}
