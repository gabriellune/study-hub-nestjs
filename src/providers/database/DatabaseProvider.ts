import 'dotenv/config';
import { Sequelize } from 'sequelize-typescript';
import { Course } from '../../modules/courses/models/entities/Course';
import { Task } from '../../modules/tasks/models/entities/Task';
import { User } from '../../modules/users/models/entities/User';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
      });
      sequelize.addModels([Course, Task, User]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
