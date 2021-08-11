import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, FindOneDto, FindUsersByEmailDto } from './dtos';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  createUser(@Body() createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    this.usersService.create(email, password);
  }

  @Get('/:id')
  findUserById(@Param() findOneDto: FindOneDto) {
    const { id } = findOneDto;
    return this.usersService.findOne(id);
  }

  // findAllUsers가 clean code관점에서 더 합당함? 인자로 email을 받으니까?
  @Get()
  findUsersByEmail(@Query() findUsersByEmailDto: FindUsersByEmailDto) {
    const { email } = findUsersByEmailDto;
    return this.usersService.find(email);
  }
}
