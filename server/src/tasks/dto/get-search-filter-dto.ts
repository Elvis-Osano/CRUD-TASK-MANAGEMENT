import { TaskStatus } from './../tasksStatus.enum';
import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';

export class getSearchFilter {
  @IsOptional()
  @IsIn([TaskStatus.DONE, TaskStatus.IN_PROCESS, TaskStatus.OPEN])
  status: TaskStatus;
  @IsOptional()
  @IsNotEmpty()
  search: string;
}
