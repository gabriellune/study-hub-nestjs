import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateCourseDTO } from '../models/dto/CreateCourseDTO';
import { Course } from '../models/classess/Course';
import { CoursesService } from '../services/CoursesService';
import { AuthGuard } from '../../../modules/auth/shared/AuthGuard';

@Controller('courses')
@ApiTags('Courses')
export class CoursesController {
  constructor(private service: CoursesService) {}

  @Get()
  @ApiOkResponse({
    description: 'Find All Courses!',
    type: Course,
  })
  @ApiOperation({ summary: 'Find all Courses' })
  async findAll(): Promise<Course[]> {
    return this.service.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOkResponse({
    description: 'Find Course!',
    type: Course,
  })
  @ApiOperation({ summary: 'Find Course by Id' })
  async getById(@Param('id') id: string): Promise<Course> {
    return this.service.getById(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  @ApiCreatedResponse({
    description: 'Created user!',
    type: Course,
  })
  @ApiOperation({ summary: 'Create Course' })
  async create(@Body() payload: CreateCourseDTO): Promise<Course> {
    return this.service.create(payload);
  }
}
