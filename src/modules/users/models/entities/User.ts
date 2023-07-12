import { Table, Model, Column, PrimaryKey } from 'sequelize-typescript';

@Table
export class User extends Model {
  @PrimaryKey
  @Column
  id: string;

  @Column
  personalIdentifier: string;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  email: string;

  @Column
  avatar: string;

  @Column
  type: string;

  @Column
  courseId: string;

  @Column
  password: string;
}
