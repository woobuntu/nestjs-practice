import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; // root 모듈

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
