import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
@Injectable() // 싱글톤
export class TasksService {
  private tasks: Task[] = [];

  // 타입스크립트에서 메소드를 정의할 때 명시적으로 접근자를 선언해주지 않으면 디폴트로 public이 된다.
  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskByID(taskId: string): Task {
    return this.tasks.find(({ id }) => id == taskId);
  }

  addTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  deleteTaskById(taskId: string): string {
    if (!this.tasks.find(({ id }) => id == taskId))
      return `id ${taskId} task는 존재하지 않습니다.`;

    this.tasks = this.tasks.filter(({ id }) => id !== taskId);

    return `id ${taskId} task는 삭제되었습니다.`;
  }
}
