import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ICourse } from '../../../modules/courses/models/interfaces/ICourse';
import { CoursesService } from '../../../modules/courses/services/CoursesService';
import { hashPassword } from '../../../utils/BCrypt';
import { AddCourseDTO } from '../models/dto/AddCourseDTO';
import { CreateMainAdminUser } from '../models/dto/CreateMainAdminUserDTO';
import { CreateUserDTO } from '../models/dto/CreateUserDTO';
import { User } from '../models/entities/User';
import { UsersType } from '../models/enums/UsersTypeEnum';
import { IUser } from '../models/interfaces/IUser';
import { ReqResUser } from '../models/interfaces/ReqResUser';
import { ReqResUsersService } from './ReqresUsersService';
import { EmailService } from '../../../modules/notifications/services/EmailService';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User,
    private readonly reqResUsersService: ReqResUsersService,
    @Inject(forwardRef(() => CoursesService))
    private readonly coursesService: CoursesService,
    private readonly emailService: EmailService,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll<User>();
  }

  async getById(id: string): Promise<IUser> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async getCourseAndUserById(
    id: string,
  ): Promise<{ user: IUser; course: ICourse }> {
    const user = await this.getById(id);
    const course =
      user && user.courseId ? await this.getCourse(user.courseId) : null; //quebrar essa rota
    return { user, course };
  }

  async getByPersonalIdentifier(personalIdentifier: string): Promise<IUser> {
    return this.usersRepository.findOne({ where: { personalIdentifier } });
  }

  async getReqResUser(id: number): Promise<ReqResUser> {
    return this.reqResUsersService.getById(id);
  }

  async getReqResAvatarUserById(id: number): Promise<ReqResUser> {
    let user;
    user = await this.usersRepository.findOne({ where: { reqResUserId: id } });

    if (!user) {
      const reqResUser = await this.getReqResUser(id);
      user = this.buildUserToCreate(reqResUser);

      void this.create(user);
    }

    return user;
  }

  private buildUserToCreate(data: ReqResUser): CreateUserDTO {
    const {
      id,
      first_name: firstName,
      last_name: lastName,
      email,
      avatar,
    } = data;

    return {
      reqResUserId: id,
      firstName,
      lastName,
      email,
      avatar,
    } as CreateUserDTO;
  }

  async create(payload: CreateUserDTO): Promise<void> {
    const id = randomUUID();
    await this.usersRepository.create({ id, ...payload });
  }

  async createMainAdminUser(payload: CreateMainAdminUser): Promise<void> {
    const password = hashPassword(payload.password);
    await this.create({ ...payload, password, type: UsersType.ADMIN });
  }

  async handleCreateUser(payload: CreateUserDTO): Promise<void> {
    switch (payload.type) {
      case UsersType.ADMIN:
        await this.handleAdminUser(payload);
      case UsersType.STUDENT:
        await this.handleStudentUser(payload);
    }
  }

  async handleAdminUser(payload: CreateUserDTO): Promise<void> {
    const password = hashPassword(payload.password);
    await this.create({ ...payload, password });
  }

  async handleStudentUser(payload: CreateUserDTO): Promise<void> {
    const { courseId } = payload;
    if (courseId && (await this.getCourse(courseId))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = payload;

      await this.create(rest);
    }
  }

  private async getCourse(id: string): Promise<ICourse> {
    const course = await this.coursesService.getById(id);

    if (!course) return null;

    return course;
  }

  async addCourse(id: string, payload: AddCourseDTO): Promise<string> {
    const user = await this.getById(id);

    if (!user) {
      throw new BadRequestException('The user doesnt exist!');
    }

    const { courseId } = payload;

    const course = await this.getCourse(courseId);

    if (!course) {
      throw new BadRequestException('The course doesnt exist!');
    }

    await this.usersRepository.update({ courseId, ...user }, { where: { id } });

    return payload.courseId;
  }

  async notifyUsers(courseId: string): Promise<void> {
    const users = await this.usersRepository.findAll({ where: { courseId } });

    const promises = [];

    for (const u of users) {
      const { email } = u;

      promises.push(
        this.emailService.sendEmail(
          email,
          'New Task',
          'Hello, a new task was added on your course!',
        ),
      );
    }

    await Promise.all(promises);
  }
}
