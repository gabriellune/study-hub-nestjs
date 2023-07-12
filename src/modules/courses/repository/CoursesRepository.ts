import { Course } from '../models/entities/Course';

export const coursesRepository = [
  {
    provide: 'COURSES_REPOSITORY',
    useValue: Course,
  },
];
