import { Injectable } from '@nestjs/common';
import { Task } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  // 타입스크립트에서 메소드를 정의할 때 명시적으로 접근자를 선언해주지 않으면 디폴트로 public이 된다.
  getAllTasks(): Task[] {
    return this.tasks;
  }
}
