import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Session,
  UseGuards,
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
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from 'src/guards/auth.guard';

// 이렇게 controller별로 설정할 수도 있고, controller 내부의 route handler별로 설정할 수도 있다.

// @UseInterceptors(CurrentUserInterceptor)
// 만약 app 전역에 적용해야 되는 interceptor라면 APP_INTERCEPTOR를 적용하여 코드의 불필요한 반복을 줄일 수 있다.
@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get('/whoami')
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Post('/signup')
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @Session() session: any,
  ) {
    const { email, password } = createUserDto;
    const user = await this.authService.signup(email, password);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signin(@Body() signInUserDto: CreateUserDto, @Session() session: any) {
    const { email, password } = signInUserDto;
    const user = await this.authService.signin(email, password);
    session.userId = user.id;
    return user;
  }

  // 굳이 Post여야할 이유가...?
  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
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
