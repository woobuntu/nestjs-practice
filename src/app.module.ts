import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsModule } from './reports/reports.module';
import { UsersModule } from './users/users.module';

// @Module은 AppModule 클래스를 모듈로 변환하는 데코레이터이다.
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [],
      synchronize: true,
    }),
    ReportsModule,
    UsersModule,
  ],
})
export class AppModule {}
