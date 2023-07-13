import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDTO } from '../models/dto/CreateUserDTO';
import { User } from '../models/entities/User';
import { UsersType } from '../models/enums/UsersTypeEnum';
import { ReqResUser } from '../models/interfaces/ReqResUser';
import { ReqResUsersService } from './ReqresUsersService';
import { CreateMainAdminUser } from '../models/dto/CreateMainAdminUserDTO';
import { randomUUID } from 'crypto';
import { IUser } from '../models/interfaces/IUser';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User,
    private readonly reqResUsersService: ReqResUsersService,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll<User>();
  }

  async getById(id: string): Promise<any> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async getByPersonalIdentifier(personalIdentifier: string): Promise<IUser> {
    return this.usersRepository.findOne({ where: { personalIdentifier } });
  }

  async getReqResUserById(id: string): Promise<ReqResUser> {
    return this.reqResUsersService.getById(id);
  }

  async getReqResAvatarUserById(id: string): Promise<ReqResUser> {
    let user;

    user = await this.getById(id);

    if (!user) {
      const reqResUser = await this.getReqResUserById(id);
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
      id: String(id),
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
    await this.create({ ...payload, type: UsersType.ADMIN });
  }
}
