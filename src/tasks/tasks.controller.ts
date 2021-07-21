import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  // 이렇게 접근자를 사용하여 클래스의 프로퍼티를 정의하는 것은 타입스크립트에서만 지원하는 기능이다.

  @Get('/') // @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Post('/') // @Post()
  // addTask(@Body() body): Task {
  // 이렇게 body 전체를 받아서 구조 분해해도 될 듯?
  // 아 이러면 타입 지정이 어려운가
  addTask(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Task {
    return this.tasksService.addTask(title, description);
    // nestjs가 알아서 http response로 변환해서 반환
  }
}
