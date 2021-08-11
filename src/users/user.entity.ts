import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity() // typeORM에게 table을 만들라고 지시
export class User {
  @PrimaryGeneratedColumn() // typeORM에게 자동으로 생성되는 PK칼럼을 생성하라고 지시
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log(`Inserted User with id ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated User with id ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`Removed User`);
    // 지워진 후라 id 참조가 안 되는 것 같다.
  }
}
