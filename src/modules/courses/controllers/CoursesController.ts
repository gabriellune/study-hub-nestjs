import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddTasksDTO } from '../models/dto/AddTasksDTO';
import { CreateCourseDTO } from '../models/dto/CreateCourseDTO';
import { ICourse } from '../models/interfaces/ICourse';
import { CoursesService } from '../services/CoursesService';
import { AuthGuard } from '../../../modules/auth/shared/AuthGuard';

@Controller('courses')
@ApiTags('Courses')
export class CoursesController {
  constructor(private service: CoursesService) {}

  @Get()
  @ApiOperation({ summary: 'Find all Courses' })
  async findAll(): Promise<ICourse[]> {
    return this.service.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Find Course by Id' })
  async getById(@Param('id') id: string): Promise<ICourse> {
    return this.service.getById(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create Course' })
  async create(@Body() payload: CreateCourseDTO): Promise<ICourse> {
    return this.service.create(payload);
  }

  @UseGuards(AuthGuard)
  @Patch(':id/add-tasks')
  @ApiOperation({ summary: 'Add Tasks' })
  async addAttachments(
    @Param('id') id: string,
    @Body() payload: AddTasksDTO,
  ): Promise<string[]> {
    return this.service.addTasks(id, payload);
  }
}
