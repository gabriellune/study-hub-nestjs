import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../providers/database/DatabaseModule';
import { UsersController } from './controllers/UsersController';
import { usersRepository } from './repository/UsersRepository';
import { UsersService } from './services/UsersService';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, ...usersRepository],
})
export class UsersModule {}
