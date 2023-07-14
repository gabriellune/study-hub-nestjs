import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table
export class Task extends Model {
  @PrimaryKey
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  grade: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    get() {
      return this.getDataValue('attachments')?.split(';');
    },
    set(value: string[]) {
      this.setDataValue('attachments', value.join(';'));
    },
  })
  attachments: string[];

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  courseId: string;
}
