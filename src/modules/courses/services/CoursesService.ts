import { Injectable, Inject } from '@nestjs/common';
import { Course } from '../models/entities/Course';

@Injectable()
export class CoursesService {
  constructor(
    @Inject('COURSES_REPOSITORY')
    private coursesRepository: typeof Course,
  ) {}

  async findAll(): Promise<Course[]> {
    return this.coursesRepository.findAll<Course>();
  }
}
