import { AuthStore } from "../src/store/auth.store";
import { TaskStore } from "../src/store/tasks.store";

export interface iStore {
  authStore: AuthStore;
  taskStore: TaskStore;
}
