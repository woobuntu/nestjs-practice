import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module'; // root 모듈

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );
  await app.listen(3000, '0.0.0.0');
  // fastify는 default로 localhost 127.0.0.1을 리스닝하기 때문에
  // 위와 같이 커스텀하기 위해서는 두번째 인자로 '0.0.0.0'를 명시해주어야 한다.
}
bootstrap();
