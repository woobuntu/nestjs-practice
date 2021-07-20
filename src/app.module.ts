import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';

// @Module은 AppModule 클래스를 모듈로 변환하는 데코레이터이다.
@Module({
  imports: [TasksModule],
})
export class AppModule {}
