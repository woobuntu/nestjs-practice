import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  // DI는 생성자 인자의 type을 보고 주입할 인스턴스를 판단한다.
  // 다만 DI는 generic type을 지원하지 않기에? InjectRepository 데코레이터가 필요한 것
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repository.create({ email, password });
    // 말그대로 userEntity의 인스턴스를 애플리케이션 안에서 'create'하는 것이고
    // entity의 hook이 자동으로 실행되게 하기 위해서는 이렇게 명시적으로 인스턴스를 생성해 주어야 한다.

    return this.repository.save(user);
    // 만들어진 userEntity의 인스턴스를 db에 'save'하는 것
  }

  async findOne(id: number) {
    if (!id) return null;
    const user = await this.repository.findOne(id);
    if (!user)
      throw new NotFoundException(`id ${id}인 user를 찾지 못했습니다.`);
    return user;
  }

  find(email: string) {
    return this.repository.find({ email });
    // 조건에 맞는 data가 없으면 빈 배열 반환
  }

  // Partial<객체>는 속성이 아예 없거나, 해당 객체의 속성으로만 구성된 객체 타입이다.
  async update(id: number, attrs: Partial<User>) {
    const originalUser = await this.repository.findOne(id);

    const updatedUser = {
      ...originalUser,
      ...attrs,
    };

    return this.repository.save(updatedUser);
  }

  async remove(id: number) {
    const userToBeDeleted = await this.repository.findOne(id);

    return this.repository.remove(userToBeDeleted);
    // remove의 인자로는 entity가, delete의 인자로는 criteria가 전달된다.
  }
}
