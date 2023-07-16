import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Course } from '../../courses/models/classess/Course';
import { CoursesService } from '../../../modules/courses/services/CoursesService';
import { hashPassword } from '../../../utils/BCrypt';
import { AddCourseDTO } from '../models/dto/AddCourseDTO';
import { CreateMainAdminUser } from '../models/dto/CreateMainAdminUserDTO';
import { CreateUserDTO } from '../models/dto/CreateUserDTO';
import { User as UserEntities } from '../models/entities/User';
import { UsersType } from '../models/enums/UsersTypeEnum';
import { User } from '../models/classes/User';
import { ReqResUser } from '../models/classes/ReqResUser';
import { ReqResUsersService } from './ReqresUsersService';
import { EmailService } from '../../../modules/notifications/services/EmailService';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof UserEntities,
    private readonly reqResUsersService: ReqResUsersService,
    @Inject(forwardRef(() => CoursesService))
    private readonly coursesService: CoursesService,
    private readonly emailService: EmailService,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll<UserEntities>();
  }

  async getById(id: string): Promise<User> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async getCourseAndUserById(
    id: string,
  ): Promise<{ user: User; course: Course }> {
    const user = await this.getById(id);
    const course =
      user && user.courseId ? await this.getCourse(user.courseId) : null;
    return { user, course };
  }

  async getByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
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
    const { email } = payload;

    const existentUser = await this.getByEmail(email);

    if (existentUser) {
      throw new BadRequestException('User already registered!');
    }

    const id = randomUUID();
    await this.usersRepository.create({ id, ...payload });
  }

  async createMainAdminUser(
    payload: CreateMainAdminUser,
  ): Promise<{ message: string }> {
    const password = hashPassword(payload.password);
    await this.create({ ...payload, password, type: UsersType.ADMIN });

    return { message: 'User Created Sucessfully' };
  }

  async handleCreateUser(payload: CreateUserDTO): Promise<{ message: string }> {
    try {
      switch (payload.type) {
        case UsersType.ADMIN:
          return this.handleAdminUser(payload);
        case UsersType.STUDENT:
          return this.handleStudentUser(payload);
      }
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async handleAdminUser(payload: CreateUserDTO): Promise<{ message: string }> {
    const password = hashPassword(payload.password);
    await this.create({ ...payload, password });
    return { message: 'User Created Sucessfully' };
  }

  async handleStudentUser(
    payload: CreateUserDTO,
  ): Promise<{ message: string }> {
    const { courseId } = payload;

    if (courseId) {
      const course = await this.getCourse(courseId);
      if (!course) {
        throw new BadRequestException('Course doesnt exists!');
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = payload;

    await this.create(rest);

    return { message: 'User Created Successfully' };
  }

  private async getCourse(id: string): Promise<Course> {
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
