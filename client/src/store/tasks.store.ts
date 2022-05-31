import { createTask, status, taskInterface } from "./../dto/tasks.dto";
import { makeAutoObservable } from "mobx";
import { AuthService } from "../services/auth.service";
import { TaskService } from "../services/tasks.service";
import { AuthStore } from "./auth.store";
export class TaskStore {
  constructor(private readonly taskService: TaskService) {
    makeAutoObservable(this);
  }

  async getTasks() {
    const bearer = this.getBearer();
    if (bearer) {
      const res = await this.taskService.getTasks(bearer);

      return res;
    }
  }
  async deleteTask(id: number) {
    await this.taskService.deleteTask(id, this.getBearer());
  }
  async createTask(task: createTask) {
    return this.taskService.createTask(task, this.getBearer());
  }
  async patchTask(id: number, status: status) {
    return this.taskService.patchTask(id, status, this.getBearer());
  }
  getBearer(): string {
    const token = localStorage.getItem("token");
    if (token) {
      return "Bearer " + token;
    }
    return "no token";
  }
}
