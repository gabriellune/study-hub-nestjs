import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Course } from '../models/entities/Course';
import { ICourse } from '../models/interfaces/ICourse';
import { CreateCourseDTO } from '../models/dto/CreateCourseDTO';
import { randomUUID } from 'crypto';
import { TasksService } from 'src/modules/tasks/services/TasksService';
import { AddTasksDTO } from '../models/dto/AddTasksDTO';

@Injectable()
export class CoursesService {
  constructor(
    @Inject('COURSES_REPOSITORY')
    private coursesRepository: typeof Course,
    private tasksService: TasksService,
  ) {}

  async findAll(): Promise<ICourse[]> {
    return this.coursesRepository.findAll<Course>();
  }

  async getById(id: string): Promise<ICourse> {
    return this.coursesRepository.findOne({ where: { id } });
  }

  async create(payload: CreateCourseDTO): Promise<ICourse> {
    const id = randomUUID();

    const { tasksIds } = payload;

    const validIds = (await this.checkExistentTasks(tasksIds)).filter(Boolean);

    return this.coursesRepository.create({
      id,
      ...payload,
      tasksIds: validIds,
    });
  }

  async checkExistentTasks(tasksIds: string[]): Promise<string[]> {
    const promises = [];

    for (const id of [...new Set(tasksIds)]) {
      promises.push(await this.getTaskId(id));
    }

    return Promise.all(promises) as unknown as string[];
  }

  private async getTaskId(id: string): Promise<string> {
    return (await this.tasksService.getById(id))?.id ?? null;
  }

  async addTasks(id: string, newTasks: AddTasksDTO): Promise<string[]> {
    const course = await this.getById(id);

    if (!course) {
      throw new BadRequestException('Course not found!');
    }

    const { tasksIds: existentTasks } = course;

    newTasks.tasksIds.forEach((att) => existentTasks.push(att));

    const tasksIds = await (
      await this.checkExistentTasks([...new Set(existentTasks)])
    ).filter(Boolean);

    await this.coursesRepository.update(
      { tasksIds, ...course },
      { where: { id } },
    );

    return tasksIds;
  }
}
