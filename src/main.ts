import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; // root 모듈

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // validation 관련 decorator를 만나면 validationPipe를 실행한다는 것
  await app.listen(3000);
}
bootstrap();
