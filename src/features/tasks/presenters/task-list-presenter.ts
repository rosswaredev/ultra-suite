import { makeAutoObservable } from "mobx";
import { TaskStore } from "../task-store";
import { isSameDay } from "date-fns";

export type TaskViewModel = {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: Date;
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

  reorderTasks(ids: string[]) {
    this.taskStore.reorderTasks(ids);
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

  get incompleteTasks(): TaskViewModel[] {
    return this.tasks.filter((task) => !task.completed);
  }

  get inbox(): TaskViewModel[] {
    return this.incompleteTasks.filter((task) => !task.dueDate);
  }

  get today(): TaskViewModel[] {
    return this.incompleteTasks.filter((task) =>
      isSameDay(task.dueDate, new Date())
    );
  }

  get upcoming(): TaskViewModel[] {
    return this.incompleteTasks
      .filter((task) => !!task.dueDate)
      .sort((a, b) => {
        if (!a.dueDate || !b.dueDate) {
          return 0;
        }
        return a.dueDate.getTime() - b.dueDate.getTime();
      });
  }

  get completed(): TaskViewModel[] {
    return this.tasks.filter((task) => task.completed);
  }

  get hasTasks() {
    return this.incompleteTasks.length > 0;
  }
}
