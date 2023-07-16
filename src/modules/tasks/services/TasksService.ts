import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { Task as TaskEntities } from '../models/entities/Task';
import { Task } from '../models/classes/Task';
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
    private tasksRepository: typeof TaskEntities,
    @Inject(forwardRef(() => CoursesService))
    private readonly courseService: CoursesService,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.tasksRepository.findAll<TaskEntities>();
  }

  async getById(id: string): Promise<Task> {
    return this.tasksRepository.findOne({ where: { id } });
  }

  async create(payload: CreateTaskDTO): Promise<any> {
    const id = randomUUID();

    return this.tasksRepository.create({ id, ...payload });
  }

  async handleCreate(payload: CreateTaskDTO): Promise<Task> {
    const { courseId } = payload;

    const course = await this.courseService.getById(courseId);

    if (!course) {
      throw new BadRequestException('Course not found!');
    }

    payload.attachments = await this.handleAttachments(payload.attachments);

    const result = await this.create(payload);

    void this.usersService.notifyUsers(courseId);
    void this.courseService.addTasks(courseId, { tasksIds: [result.id] });

    void publisher('A new task was created!');

    return result;
  }

  async handleAttachments(attachments: string[]): Promise<string[]> {
    const validAttachments: string[] = [];

    attachments?.forEach((res) => {
      if (res.match(/.pdf/g)) {
        validAttachments.push(res);
      }
    });

    return validAttachments;
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

    const filteredAttachments = [
      ...new Set(await this.handleAttachments(attachments)),
    ];

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
