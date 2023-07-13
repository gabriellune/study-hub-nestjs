import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddTasksDTO } from '../models/dto/AddTasksDTO';
import { CreateCourseDTO } from '../models/dto/CreateCourseDTO';
import { ICourse } from '../models/interfaces/ICourse';
import { CoursesService } from '../services/CoursesService';

@Controller('courses')
@ApiTags('Courses')
export class CoursesController {
  constructor(private service: CoursesService) {}

  @Get()
  @ApiOperation({ summary: 'Find all Courses' })
  async findAll(): Promise<ICourse[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find Course by Id' })
  async getById(@Param('id') id: string): Promise<ICourse> {
    return this.service.getById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create Course' })
  async create(@Body() payload: CreateCourseDTO): Promise<ICourse> {
    return this.service.create(payload);
  }

  @Patch(':id/add-tasks')
  @ApiOperation({ summary: 'Add Tasks' })
  async addAttachments(
    @Param('id') id: string,
    @Body() payload: AddTasksDTO,
  ): Promise<string[]> {
    return this.service.addTasks(id, payload);
  }
}
