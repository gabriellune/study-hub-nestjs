import { Task } from '../models/entities/Task';

export const tasksRepository = [
  {
    provide: 'TASKS_REPOSITORY',
    useValue: Task,
  },
];
