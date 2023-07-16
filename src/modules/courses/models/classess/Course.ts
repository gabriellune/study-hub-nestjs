import { ApiProperty } from '@nestjs/swagger';

export class Course {
  @ApiProperty({
    description: 'The id of the course',
    example: 'id',
  })
  id: string;

  @ApiProperty({
    description: 'The name of the course',
    example: 'name',
  })
  name: string;

  @ApiProperty({
    description: 'The sector of the course',
    example: 'sector',
  })
  sector: string;

  @ApiProperty({
    description: 'The duration of the course',
    example: 60,
  })
  duration: number;

  @ApiProperty({
    description: 'The tasks ids of the course',
    example: ['taskId'],
  })
  tasksIds: string[];
}
