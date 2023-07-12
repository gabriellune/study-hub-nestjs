import { Module } from '@nestjs/common';
import { TasksController } from './controllers/TasksController';

@Module({
  controllers: [TasksController],
})
export class TasksModule {}
