import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  CreateUserDto,
  FindOneDto,
  FindUsersByEmailDto,
  UpdateUserDto,
  UserDto,
} from './dtos';
import { Serialize } from '../interceptors/serialize.interceptors';
import { AuthService } from './auth.service';

// 이렇게 controller별로 설정할 수도 있고, controller 내부의 route handler별로 설정할 수도 있다.
@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  createUser(@Body() createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    return this.authService.signup(email, password);
  }

  @Get('/:id')
  findUserById(@Param() { id }: FindOneDto) {
    return this.usersService.findOne(id);
  }

  // findAllUsers가 clean code관점에서 더 합당함? 인자로 email을 받으니까?
  @Get()
  findUsersByEmail(@Query() { email }: FindUsersByEmailDto) {
    return this.usersService.find(email);
  }

  @Delete('/:id')
  removeUserById(@Param() { id }: FindOneDto) {
    return this.usersService.remove(id);
  }

  @Patch('/:id') // PUT은 resource 전체의 수정, PATCH는 resource 부분 수정
  updateUser(
    @Param() { id }: FindOneDto,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }
}
