import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../tasksStatus.enum';

export class TaskStatusValidPipe implements PipeTransform {
  readonly validStatus = [
    TaskStatus.DONE,
    TaskStatus.OPEN,
    TaskStatus.IN_PROCESS,
  ];
  transform(value: any) {
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} invalid status`);
    }

    return value;
  }
  private isStatusValid(value: any) {
    const indx = this.validStatus.indexOf(value);
    return indx !== -1;
  }
}
