import { Module } from '@nestjs/common';
import { databaseProviders } from './DatabaseProvider';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
