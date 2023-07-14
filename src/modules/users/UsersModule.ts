import { Module, forwardRef } from '@nestjs/common';
import { DatabaseModule } from '../../providers/database/DatabaseModule';
import { UsersController } from './controllers/UsersController';
import { usersRepository } from './repository/UsersRepository';
import { UsersService } from './services/UsersService';
import { HttpModule } from '@nestjs/axios';
import { ReqResUsersService } from './services/ReqresUsersService';
import { CoursesModule } from '../courses/CoursesModule';
import { NotificationModule } from '../notifications/NotificationModule';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
    DatabaseModule,
    NotificationModule,
    forwardRef(() => CoursesModule),
  ],
  controllers: [UsersController],
  providers: [UsersService, ReqResUsersService, ...usersRepository],
  exports: [UsersService],
})
export class UsersModule {}
