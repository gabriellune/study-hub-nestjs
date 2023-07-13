import { Module } from '@nestjs/common';
import { TasksController } from './controllers/TasksController';
import { DatabaseModule } from '../../providers/database/DatabaseModule';
import { TasksService } from './services/TasksService';
import { tasksRepository } from './repository/TasksRepository';

@Module({
  imports: [DatabaseModule],
  controllers: [TasksController],
  providers: [TasksService, ...tasksRepository],
  exports: [TasksService],
})
export class TasksModule {}
