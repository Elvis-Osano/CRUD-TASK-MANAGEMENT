import { User } from 'src/auth/user.entity';
import { createTaskDTO } from './dto/create-task-dto';
import { TaskRepository } from './task.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Task from './tasks.entity';
import { TaskStatus } from './tasksStatus.enum';
import { getSearchFilter } from './dto/get-search-filter-dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository) private taskRespository: TaskRepository,
  ) {}
  getTasks(filterDto: getSearchFilter, user: User): Promise<Task[]> {
    return this.taskRespository.getTasks(filterDto, user);
  }
  async createTask(createTaskDTO: createTaskDTO, user: User): Promise<Task> {
    return this.taskRespository.createTask(createTaskDTO, user);
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    const found = await this.taskRespository.findOne({
      where: { id, userId: user.id },
    });
    if (!found) {
      throw new NotFoundException(`item id ${id} was never found`);
    }
    return found;
  }

  async delTask(id: number, user: User): Promise<void> {
    const x = this.getTaskById(id, user);
    if (x) {
      this.taskRespository.delete(id);
    }
  }

  async patchTask(id: number, status: TaskStatus, user: User): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await task.save();
    return task;
  }
  // createTask(createTaskDTO: createTaskDTO) {
  //   const { title, description } = createTaskDTO;
  //   const task: Task = {
  //     id: new Date().toISOString(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return this.tasks;
  // }
  // getTaskById(id: string): Task {
  //   const found = this.tasks.find((task) => task.id === id);
  //   if (!found) {
  //     throw new NotFoundException(`item id ${id} was never found`);
  //   }
  //   return found;
  // }
  // delTask(id: string) {
  //   this.getTaskById(id);
  //   const newTask = this.tasks.filter((item) => item.id !== id);
  //   this.tasks = newTask;
  // }
  // getFilteredTasks(filterDto: getSearchFilter) {
  //   let tasks = this.getAllTasks();
  //   const { search, status } = filterDto;
  //   if (search) {
  //     tasks = tasks.filter(
  //       (item) =>
  //         item.title.includes(search) || item.description.includes(search),
  //     );
  //   }
  //   if (status) {
  //     tasks = tasks.filter((item) => item.status === status);
  //   }
  //   return tasks;
  // }
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  // patchTask(id: string, status: TaskStatus) {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}
