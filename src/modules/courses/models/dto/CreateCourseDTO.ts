import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCourseDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  sector: string;

  @IsNotEmpty()
  @IsOptional()
  duration: number;

  @IsNotEmpty()
  @IsArray()
  tasks: string[];
}
