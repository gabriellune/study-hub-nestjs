import { ArrayMinSize, IsArray, IsNotEmpty } from 'class-validator';

export class AddTasksDTO {
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  tasksIds: string[];
}
