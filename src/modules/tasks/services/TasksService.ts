import { Injectable, Inject } from '@nestjs/common';
import { Task } from '../models/entities/Task';

@Injectable()
export class TasksService {
  constructor(
    @Inject('TASKS_REPOSITORY')
    private tasksRepository: typeof Task,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.tasksRepository.findAll<Task>();
  }
}
