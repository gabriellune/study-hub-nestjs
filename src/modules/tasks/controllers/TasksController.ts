import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('tasks')
@ApiTags('Tasks')
export class TasksController {
  @Get()
  findAll(): string {
    return 'tasks';
  }
}
