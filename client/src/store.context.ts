import { AuthService } from "./services/auth.service";
import { iStore } from "./../interface/Istore";
import React from "react";
import { AuthStore } from "./store/auth.store";
import { TaskStore } from "./store/tasks.store";
import { TaskService } from "./services/tasks.service";
const authService = new AuthService();
const authStore = new AuthStore(authService);
const taskStore = new TaskStore(new TaskService());

export const storeContext = React.createContext<iStore>({
  authStore,
  taskStore,
});
