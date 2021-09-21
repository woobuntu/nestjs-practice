import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; // root 모듈
// cookie-session 라이브러리의 내부 설정 중 tsconfig의 설정과 호환이 안 되는 문제가 있어 require문을 사용
import cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cookieSession({
      keys: ['foseja'], //쿠키에 담길  정보를 암호화할 때 사용된다.
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      // Dto에 정의되어 있지 않은 property는 없애버린다는 옵션
      // 임의로 admin 권한을 집어넣는다던가 하는 것을 방지하는 보안 상의 옵션
    }),
  );
  await app.listen(3000);
}
bootstrap();
