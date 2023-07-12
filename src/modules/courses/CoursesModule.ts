import { Module } from '@nestjs/common';
import { CoursesController } from './controllers/CoursesController';

@Module({
  controllers: [CoursesController],
})
export class CoursesModule {}
