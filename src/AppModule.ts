import { Module } from '@nestjs/common';
import { CoursesModule } from './modules/courses/CoursesModule';
import { TasksModule } from './modules/tasks/TasksModule';
import { UsersModule } from './modules/users/UsersModule';
import { AuthModule } from './modules/auth/AuthModule';

@Module({
  imports: [CoursesModule, TasksModule, UsersModule, AuthModule],
})
export class AppModule {}
