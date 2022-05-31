export interface taskInterface {
  id: number;
  title: string;
  description: string;
  status: taskStatus | string;
}
export enum taskStatus {
  DONE = "DONE",
  IN_PROGRESS = "IN_PROGRESS",
  OPEN = "OPEN",
}
export type createTask = {
  title: string;
  description: string;
};
export type status = {
  status: string;
};
