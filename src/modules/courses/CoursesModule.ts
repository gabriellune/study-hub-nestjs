import { Module } from '@nestjs/common';
import { CoursesController } from './controllers/CoursesController';
import { DatabaseModule } from '../../providers/database/DatabaseModule';
import { coursesRepository } from './repository/CoursesRepository';
import { CoursesService } from './services/CoursesService';

@Module({
  imports: [DatabaseModule],
  controllers: [CoursesController],
  providers: [CoursesService, ...coursesRepository],
})
export class CoursesModule {}
