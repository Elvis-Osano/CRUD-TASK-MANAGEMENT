import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm'; //typeorm@0.2.34.
import { createTaskDTO } from './dto/create-task-dto';
import { getSearchFilter } from './dto/get-search-filter-dto';
import Task from './tasks.entity';
import { TaskStatus } from './tasksStatus.enum';
@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(createTaskDTO: createTaskDTO, user: User): Promise<Task> {
    const { title, description } = createTaskDTO;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user;

    await task.save();
    delete task.user;
    return task;
  }
  async getTasks(filterDto: getSearchFilter, user: User): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');
    query.where('task.userId = :userid', { userid: user.id });
    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        'task.title LIKE :search OR task.description LIKE :search',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();
    return tasks;
  }
}
