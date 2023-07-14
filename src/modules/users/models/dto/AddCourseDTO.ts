import { IsNotEmpty, IsString } from 'class-validator';

export class AddCourseDTO {
  @IsNotEmpty()
  @IsString()
  courseId: string;
}
