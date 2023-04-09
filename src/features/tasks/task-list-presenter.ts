import { makeAutoObservable } from "mobx";
import { TaskStore } from "./task-store";

export class TaskListPresenter {
  constructor(private taskStore: TaskStore) {
    makeAutoObservable(this);
  }

  addTask(title: string) {
    return this.taskStore.addTask(title)
  }

  removeTask(id: string) {
    this.taskStore.removeTask(id);
  }

  toggleCompletion(id: string) {
    this.taskStore.toggleCompletion(id);
  }

  get tasks() {
    return this.taskStore.tasks
  }
}