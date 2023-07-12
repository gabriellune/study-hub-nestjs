import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('courses')
@ApiTags('Courses')
export class CoursesController {
  @Get()
  findAll(): string {
    return 'courses';
  }
}
