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
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  // 이렇게 접근자를 사용하여 클래스의 프로퍼티를 정의하는 것은 타입스크립트에서만 지원하는 기능이다.

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    return Object.keys(filterDto).length
      ? this.tasksService.getTasksWithFilters(filterDto)
      : this.tasksService.getAllTasks();
  }
  @Get('/:taskId')
  getTaskByID(@Param('taskid') taskId: string): Task {
    return this.tasksService.getTaskByID(taskId);
  }

  @Post()
  addTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.addTask(createTaskDto);
    // nestjs가 알아서 http response로 변환해서 반환
  }

  @Delete('/:taskId')
  deleteTask(@Param('taskId') taskId: string): string {
    return this.tasksService.deleteTaskById(taskId);
  }

  @Patch('/:taskId/status')
  updateTask(
    @Param('taskId') taskId: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Task {
    const { newStatus } = updateTaskStatusDto;
    return this.tasksService.updateTaskStatusById(taskId, newStatus);
  }
}
