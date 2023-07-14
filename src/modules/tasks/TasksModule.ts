import { Module, forwardRef } from '@nestjs/common';
import { TasksController } from './controllers/TasksController';
import { DatabaseModule } from '../../providers/database/DatabaseModule';
import { TasksService } from './services/TasksService';
import { tasksRepository } from './repository/TasksRepository';
import { CoursesModule } from '../courses/CoursesModule';
import { UsersModule } from '../users/UsersModule';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => CoursesModule),
    forwardRef(() => UsersModule),
  ],
  controllers: [TasksController],
  providers: [TasksService, ...tasksRepository],
  exports: [TasksService],
})
export class TasksModule {}
