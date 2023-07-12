import { Module } from '@nestjs/common';
import { UsersController } from './controllers/UsersController';

@Module({
  controllers: [UsersController],
})
export class UsersModule {}
