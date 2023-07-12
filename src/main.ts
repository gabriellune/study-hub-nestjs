import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';
import 'dotenv/config';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const PORT = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('Study Hub')
    .setDescription('The Hub to manage users, courses and the courses tasks.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(PORT);
  Logger.debug(`Listening on http://localhost:${PORT}/`);
}

bootstrap();
