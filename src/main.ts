import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';
import 'dotenv/config';
import { Logger } from '@nestjs/common';

const PORT = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(PORT);
  Logger.debug(`Listening on http://localhost:${PORT}/`);
}

bootstrap();
