import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddCourseDTO {
  @ApiProperty({
    description: 'The course id of the user',
    example: 'courseId',
  })
  @IsNotEmpty()
  @IsString()
  courseId: string;
}
