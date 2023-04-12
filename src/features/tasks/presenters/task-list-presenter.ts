import { makeAutoObservable } from "mobx";
import { TaskStore } from "../task-store";

export type TaskViewModel = {
  id: string;
  title: string;
  completed: boolean;
  dueDate: Date;
  toggleCompletion: () => void;
};

export class TaskListPresenter {
  constructor(private taskStore: TaskStore) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  addTask(title: string, dueDate: Date) {
    return this.taskStore.addTask(title, dueDate);
  }

  removeTask(id: string) {
    this.taskStore.removeTask(id);
  }

  toggleCompletion(id: string) {
    this.taskStore.toggleCompletion(id);
  }

  get tasks(): TaskViewModel[] {
    return this.taskStore.tasks.map((task) => ({
      id: task.id,
      title: task.title,
      completed: task.completed,
      dueDate: task.dueDate,
      toggleCompletion: () => this.toggleCompletion(task.id),
    }));
  }

  get hasTasks() {
    return this.tasks.length > 0;
  }
}
