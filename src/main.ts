import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe()); // ## validate payload data/DTO upcoming data,  after using this globalPipe "@IsNotEmpty()" this work in DTO


  // Create an instance of the AuthGuard
  //const jwtAuthGuard = new (AuthGuard('jwt'))();
  //app.useGlobalGuards(jwtAuthGuard);   // Use the guard globally

  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));


  await app.listen(3001);
}
bootstrap();
