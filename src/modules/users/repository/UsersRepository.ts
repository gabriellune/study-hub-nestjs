import { User } from '../models/entities/User';

export const usersRepository = [
  {
    provide: 'USERS_REPOSITORY',
    useValue: User,
  },
];
