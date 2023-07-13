import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TasksService } from '../services/TasksService';
import { ITask } from '../models/interfaces/ITask';
import { CreateTaskDTO } from '../models/dto/CreateTaskDTO';
import { AddAttachmentsDTO } from '../models/dto/AddAttachmentsDTO';

@Controller('tasks')
@ApiTags('Tasks')
export class TasksController {
  constructor(private readonly service: TasksService) {}

  @Get()
  @ApiOperation({ summary: 'Find All Tasks' })
  async findAll(): Promise<ITask[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find Task by Id' })
  async getById(@Param('id') id: string): Promise<ITask> {
    return this.service.getById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create Task' })
  async create(@Body() payload: CreateTaskDTO): Promise<ITask> {
    return this.service.create(payload);
  }

  @Patch(':id/add-attachments')
  @ApiOperation({ summary: 'Add attachments' })
  async addAttachments(
    @Param('id') id: string,
    @Body() payload: AddAttachmentsDTO,
  ): Promise<string[]> {
    return this.service.addAttachments(id, payload);
  }

  @Get(':id/attachments')
  @ApiOperation({ summary: 'Get Attachments by Task Id' })
  async getByAttachmentsByTaskId(@Param('id') id: string): Promise<string[]> {
    return this.service.getByAttachmentsByTaskId(id);
  }
}
