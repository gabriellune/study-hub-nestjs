import { ApiProperty } from '@nestjs/swagger';
import { Course } from '../../../courses/models/classess/Course';
import { User } from '../entities/User';

export class UserAndCourse {
  @ApiProperty({
    type: User,
  })
  user: User;

  @ApiProperty({
    type: Course,
  })
  course: Course;
}
