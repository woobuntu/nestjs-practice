import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './reports/report.entity';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';

// @Module은 AppModule 클래스를 모듈로 변환하는 데코레이터이다.
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Report],
      synchronize: true,
      // 개발 환경에서만 true로 설정하는 속성이다.
      // typeORM이 entity들을 보고 자동으로 database의 구조를 설정(migration)하도록 허용하는 속성인 것
    }),
    ReportsModule,
    UsersModule,
  ],
})
export class AppModule {}
