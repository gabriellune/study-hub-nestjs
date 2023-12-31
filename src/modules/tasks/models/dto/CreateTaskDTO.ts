import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
} from 'class-validator';

export class CreateTaskDTO {
  @ApiProperty({
    description: 'The name of the task',
    example: 'name',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The grade of the task',
    example: 10,
  })
  @IsNotEmpty()
  @IsNumber()
  grade: number; // nota máxima

  @ApiProperty({
    description: 'The attachments of the task',
    example: ['attachment'],
  })
  @IsOptional()
  @IsArray()
  attachments: string[];

  @ApiProperty({
    description: 'The course id of the task',
    example: 'courseId',
  })
  @IsNotEmpty()
  @IsString()
  courseId: string;
}
