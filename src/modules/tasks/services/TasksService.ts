import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Task } from '../models/entities/Task';
import { ITask } from '../models/interfaces/ITask';
import { CreateTaskDTO } from '../models/dto/CreateTaskDTO';
import { randomUUID } from 'crypto';
import { AddAttachmentsDTO } from '../models/dto/AddAttachmentsDTO';

//IMPLEMENTAR VALIDAÇÃO PDF

@Injectable()
export class TasksService {
  constructor(
    @Inject('TASKS_REPOSITORY')
    private tasksRepository: typeof Task,
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

    await this.tasksRepository.update(
      { attachments, ...task },
      { where: { id } },
    );

    return attachments;
  }

  async getByAttachmentsByTaskId(id: string): Promise<string[]> {
    return (await this.getById(id))?.attachments;
  }
}
