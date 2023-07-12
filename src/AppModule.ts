import { Module } from '@nestjs/common';
import { CoursesModule } from './modules/courses/CoursesModule';
import { TasksModule } from './modules/tasks/TasksModule';
import { UsersModule } from './modules/users/UsersModule';

@Module({
  imports: [CoursesModule, TasksModule, UsersModule],
})
export class AppModule {}
