import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { Task } from '../models/entities/Task';
import { ITask } from '../models/interfaces/ITask';
import { CreateTaskDTO } from '../models/dto/CreateTaskDTO';
import { randomUUID } from 'crypto';
import { AddAttachmentsDTO } from '../models/dto/AddAttachmentsDTO';
import { CoursesService } from '../../../modules/courses/services/CoursesService';
import { publisher } from '../../../utils/Publisher';
import { UsersService } from '../../../modules/users/services/UsersService';

//IMPLEMENTAR VALIDAÇÃO PDF

@Injectable()
export class TasksService {
  constructor(
    @Inject('TASKS_REPOSITORY')
    private tasksRepository: typeof Task,
    @Inject(forwardRef(() => CoursesService))
    private readonly courseService: CoursesService,
    @Inject(forwardRef(() => CoursesService))
    private readonly usersService: UsersService,
  ) {}

  async findAll(): Promise<ITask[]> {
    return this.tasksRepository.findAll<Task>();
  }

  async getById(id: string): Promise<ITask> {
    return this.tasksRepository.findOne({ where: { id } });
  }

  async create(payload: CreateTaskDTO): Promise<ITask> {
    const id = randomUUID();

    return this.tasksRepository.create({ id, ...payload });
  }

  async handleCreate(payload: CreateTaskDTO): Promise<ITask> {
    const { courseId } = payload;

    const course = await this.courseService.getById(courseId);

    if (!course) {
      throw new BadRequestException('Course not found!');
    }

    const result = await this.create(payload);

    void publisher('A new task was created!');

    void this.usersService.notifyUsers(courseId);
    void this.courseService.addTasks(courseId, { tasksIds: [result.id] });

    return result;
  }

  async addAttachments(
    id: string,
    newAttachments: AddAttachmentsDTO,
  ): Promise<string[]> {
    const task = await this.getById(id);

    if (!task) {
      throw new BadRequestException('Task not found!');
    }

    const { attachments } = task;

    newAttachments.attachments.forEach((att) => attachments.push(att));

    const filteredAttachments = [...new Set(attachments)];

    await this.tasksRepository.update(
      { attachments: filteredAttachments, ...task },
      { where: { id } },
    );

    return attachments;
  }

  async getByAttachmentsByTaskId(id: string): Promise<string[]> {
    return (await this.getById(id))?.attachments;
  }
}
