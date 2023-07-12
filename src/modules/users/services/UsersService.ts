import { Injectable, Inject } from '@nestjs/common';
import { User } from '../models/entities/User';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll<User>();
  }
}
