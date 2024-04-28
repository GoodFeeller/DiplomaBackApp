import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ConfigService} from '@nestjs/config'
import { ValidationPipe } from '@nestjs/common';
import { json } from 'express';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)
  const port = configService.get('port')
  app.use(json({limit: '50mb'}))
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors()
  await app.listen(port, '0.0.0.0');
}
bootstrap();
