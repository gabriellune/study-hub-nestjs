import { ApiProperty } from '@nestjs/swagger';

export class Task {
  @ApiProperty({
    description: 'The id of the task',
    example: 'id',
  })
  id: string;

  @ApiProperty({
    description: 'The name of the task',
    example: 'name',
  })
  name: string;

  @ApiProperty({
    description: 'The grade of the task',
    example: 10,
  })
  grade: number;

  @ApiProperty({
    description: 'The attachements of the task',
    example: ['attachment'],
  })
  attachments: string[];

  @ApiProperty({
    description: 'The course id of the task',
    example: 'courseId',
  })
  courseId: string;
}
