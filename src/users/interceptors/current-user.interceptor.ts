import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { UsersService } from '../users.service';

// 데코레이터는 DI 밖에서 작동하기 때문에 service에 접근할 수 없음
// 따라서 DI 안에서 동작하는 인터셉터를 활용하는 것
@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}

  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest();

    const { userId } = request.session || {};

    if (userId) {
      // session에 userId가 있으니, 해당 id의 user를 찾아 request 객체에 저장하여
      // currentUser 데코레이터에서 참조할 수 있도록 하는 것
      const user = await this.usersService.findOne(userId);
      request.currentUser = user;
    }

    return handler.handle();
  }
}
