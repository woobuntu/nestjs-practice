import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    try {
      const usersWithEmail = await this.usersService.find(email);

      if (usersWithEmail.length)
        throw new BadRequestException('해당 이메일의 가입자가 이미 있습니다.');

      const salt = randomBytes(8).toString('hex');
      // randomBytes가 이진 buffer(8byte)를 반환하므로 16진법의 임의의 문자열로 전환
      // 1byte가 2character로 전환된다.

      const hash = (await scrypt(password, salt, 32)) as Buffer;
      // password와 salt를 조합해 32자리의 hash값을 만든다.
      // type casting

      const result = salt + '.' + hash.toString('hex');
      // 구분자에는 제한이 없다.

      const createdUser = await this.usersService.create(email, result);

      return createdUser;
    } catch (error) {
      throw error;
    }
  }

  async signin(email: string, password: string) {
    const [user] = await this.usersService.find(email);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex'))
      throw new BadRequestException('bad password');

    return user;
  }
}
