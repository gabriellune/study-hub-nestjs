import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
} from 'sequelize-typescript';

@Table
export class Course extends Model {
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
    type: DataType.STRING,
    allowNull: false,
  })
  sector: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  duration: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    get() {
      return this.getDataValue('tasksIds').split(';');
    },
    set(value: string[]) {
      this.setDataValue('tasksIds', value.join(';'));
    },
  })
  tasksIds: string[];
}
