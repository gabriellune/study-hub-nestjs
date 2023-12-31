import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCourseDTO {
  @ApiProperty({
    description: 'The name of the course',
    example: 'name',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The sector of the course',
    example: 'sector',
  })
  @IsNotEmpty()
  @IsString()
  sector: string;

  @ApiProperty({
    description: 'The duration (minutes) of the course',
    example: 60,
  })
  @IsNotEmpty()
  @IsNumber()
  duration: number;
}
