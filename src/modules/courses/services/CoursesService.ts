import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Course as CourseEntities } from '../models/entities/Course';
import { Course } from '../models/classess/Course';
import { CreateCourseDTO } from '../models/dto/CreateCourseDTO';
import { randomUUID } from 'crypto';
import { TasksService } from '../../../modules/tasks/services/TasksService';
import { AddTasksDTO } from '../models/dto/AddTasksDTO';

@Injectable()
export class CoursesService {
  constructor(
    @Inject('COURSES_REPOSITORY')
    private coursesRepository: typeof CourseEntities,
    private tasksService: TasksService,
  ) {}

  async findAll(): Promise<Course[]> {
    return this.coursesRepository.findAll<CourseEntities>();
  }

  async getById(id: string): Promise<Course> {
    return this.coursesRepository.findOne({ where: { id } });
  }

  async create(payload: CreateCourseDTO): Promise<Course> {
    const id = randomUUID();

    return this.coursesRepository.create({
      id,
      ...payload,
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
    return (await this.tasksService.getById(id))?.id;
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
