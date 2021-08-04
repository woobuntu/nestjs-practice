import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // typeORM에게 table을 만들라고 지시
export class User {
  @PrimaryGeneratedColumn() // typeORM에게 자동으로 생성되는 PK칼럼을 생성하라고 지시
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;
}
