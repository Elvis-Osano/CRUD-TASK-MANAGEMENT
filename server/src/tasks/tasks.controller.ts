import { TaskStatus } from './tasksStatus.enum';
import { TasksService } from './tasks.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
  Logger,
} from '@nestjs/common';
import Task from './tasks.entity';
import { createTaskDTO } from './dto/create-task-dto';
import { TaskStatusValidPipe } from './pipes/task-status-validation-pipe';
import { getSearchFilter } from './dto/get-search-filter-dto';
import { AuthGuard } from '@nestjs/passport';
import { getUser } from 'src/auth/user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TasksController');
  constructor(private TasksService: TasksService) {}
  @Get()
  getTasks(
    @Query(ValidationPipe) filterDto: getSearchFilter,
    @getUser() user: User,
  ): Promise<Task[]> {
    this.logger.verbose(
      `User "${user.username}" retrieving all tasks filter:"${JSON.stringify(
        filterDto,
      )}"`,
    );
    return this.TasksService.getTasks(filterDto, user);
  }
  @Get('/:id')
  getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @getUser() user: User,
  ): Promise<Task> {
    return this.TasksService.getTaskById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @Body() createTaskDTO: createTaskDTO,
    @getUser() user: User,
  ): Promise<Task> {
    return this.TasksService.createTask(createTaskDTO, user);
  }

  @Delete('/:id')
  delTask(
    @Param('id', ParseIntPipe) id: number,
    @getUser() user: User,
  ): Promise<void> {
    return this.TasksService.delTask(id, user);
  }
  @Patch('/:id')
  patchTask(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidPipe) status: TaskStatus,
    @getUser() user: User,
  ): Promise<Task> {
    return this.TasksService.patchTask(id, status, user);
  }
  // @Get('/:id')
  // getTaskById(@Param('id') id: string): Task {
  //   return this.TasksService.getTaskById(id);
  // }
  // @Patch('/:id/status')
  // patchTask(
  //   @Param('id') id: string,
  //   @Body('status', TaskStatusValidPipe) status: TaskStatus,
  // ) {
  //   return this.TasksService.patchTask(id, status);
  // }// @Get()
  // getTasks(@Query(ValidationPipe) filterDto: getSearchFilter): Task[] {
  //   if (Object.keys(filterDto).length) {
  //     return this.TasksService.getFilteredTasks(filterDto);
  //   } else {
  //     return this.TasksService.getAllTasks();
  //   }
  // } // @Post()
  // @UsePipes(ValidationPipe)
  // createTask(@Body() createTaskDTO: createTaskDTO): Task[] {
  //   return this.TasksService.createTask(createTaskDTO);
  // }
  // @Delete('/del/:id')
  // delTask(@Param('id') id: string) {
  //   return this.TasksService.delTask(id);
  // }
}
