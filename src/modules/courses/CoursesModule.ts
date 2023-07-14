import { Module } from '@nestjs/common';
import { CoursesController } from './controllers/CoursesController';
import { DatabaseModule } from '../../providers/database/DatabaseModule';
import { coursesRepository } from './repository/CoursesRepository';
import { CoursesService } from './services/CoursesService';
import { TasksModule } from '../tasks/TasksModule';

@Module({
  imports: [DatabaseModule, TasksModule],
  controllers: [CoursesController],
  providers: [CoursesService, ...coursesRepository],
  exports: [CoursesService],
})
export class CoursesModule {}
