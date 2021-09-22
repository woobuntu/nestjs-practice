import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    // ExecutionContext는 incoming request에 대한 wrapper이다.
    // request가 아니라 ExecutionContext라고 명명한 것은 HTTP request외에도 소켓 등 다른 통신 프로토콜이 포함될 수 있기 때문
    const request = context.switchToHttp().getRequest();
    return request.currentUser;
  },
);
