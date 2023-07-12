import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TasksService } from '../services/TasksService';
import { Task } from '../models/entities/Task';

@Controller('tasks')
@ApiTags('Tasks')
export class TasksController {
  constructor(private readonly service: TasksService) {}

  @Get()
  async findAll(): Promise<Task[]> {
    return this.service.findAll();
  }
}
