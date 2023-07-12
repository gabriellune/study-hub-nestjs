import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CoursesService } from '../services/CoursesService';
import { Course } from '../models/entities/Course';

@Controller('courses')
@ApiTags('Courses')
export class CoursesController {
  constructor(private service: CoursesService) {}

  @Get()
  async findAll(): Promise<Course[]> {
    return this.service.findAll();
  }
}
