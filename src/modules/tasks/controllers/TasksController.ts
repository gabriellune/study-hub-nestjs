import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { TasksService } from '../services/TasksService';
import { Task } from '../models/classes/Task';
import { CreateTaskDTO } from '../models/dto/CreateTaskDTO';
import { AddAttachmentsDTO } from '../models/dto/AddAttachmentsDTO';
import { AuthGuard } from '../../../modules/auth/shared/AuthGuard';

@Controller('tasks')
@ApiTags('Tasks')
export class TasksController {
  constructor(private readonly service: TasksService) {}

  @UseGuards(AuthGuard)
  @Get()
  @ApiOkResponse({
    description: 'Find All Tasks!',
    type: Task,
  })
  @ApiOperation({ summary: 'Find All Tasks' })
  async findAll(): Promise<Task[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Find Task!',
    type: Task,
  })
  @ApiOperation({ summary: 'Find Task by Id' })
  async getById(@Param('id') id: string): Promise<Task> {
    return this.service.getById(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  @ApiCreatedResponse({
    description: 'Created task!',
    type: Task,
  })
  @ApiOperation({ summary: 'Create Task' })
  async create(@Body() payload: CreateTaskDTO): Promise<Task> {
    return this.service.handleCreate(payload);
  }

  @UseGuards(AuthGuard)
  @Patch(':id/add-attachments')
  @ApiOkResponse({
    description: 'Add attachments!',
    type: Array<string>,
  })
  @ApiOperation({ summary: 'Add attachments' })
  async addAttachments(
    @Param('id') id: string,
    @Body() payload: AddAttachmentsDTO,
  ): Promise<string[]> {
    return this.service.addAttachments(id, payload);
  }

  @Get(':id/attachments')
  @ApiOkResponse({
    description: 'Find All Attachments of a task!',
    type: Array<string>,
  })
  @ApiOperation({ summary: 'Get Attachments by Task Id' })
  async getByAttachmentsByTaskId(@Param('id') id: string): Promise<string[]> {
    return this.service.getByAttachmentsByTaskId(id);
  }
}
