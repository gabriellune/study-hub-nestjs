import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCourseDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  sector: string;

  @IsNotEmpty()
  @IsNumber()
  duration: number;

  @IsOptional()
  @IsArray()
  tasksIds: string[];
}
