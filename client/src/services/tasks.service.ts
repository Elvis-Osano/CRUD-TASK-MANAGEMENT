import {
  createTask,
  status,
  taskInterface,
  taskStatus,
} from "./../dto/tasks.dto";
export class TaskService {
  async getTasks(bearer: string) {
    const res = await fetch(`http://localhost:8000/tasks`, {
      method: "GET",
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
    });
    const tasks = res.json();
    return tasks;
  }
  async deleteTask(id: number, bearer: string) {
    return await fetch(`http://localhost:8000/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
    });
  }
  async createTask(task: createTask, bearer: string) {
    const response = await fetch(`http://localhost:8000/tasks`, {
      method: "post",
      body: JSON.stringify(task),
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
    });
    const parse = await response.json();
    return parse;
  }
  async patchTask(id: number, status: status, bearer: string) {
    const response = await fetch(`http://localhost:8000/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify(status),
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
    });
    return response;
  }
}
