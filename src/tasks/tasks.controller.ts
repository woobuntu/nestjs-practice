import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  // 이렇게 접근자를 사용하여 클래스의 프로퍼티를 정의하는 것은 타입스크립트에서만 지원하는 기능이다.

  @Get('/')
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }
}
