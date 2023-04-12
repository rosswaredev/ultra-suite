import { makeAutoObservable } from "mobx";
import { Task, TaskStore } from "../task-store";

export class TaskDetailPresenter {
  private task: Task;

  constructor(private taskStore: TaskStore, private taskId: string) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.task = taskStore.tasks.find((task) => task.id === taskId);
  }

  toggleCompletion() {
    this.taskStore.toggleCompletion(this.taskId);
  }

  updateTitle(title: string) {
    this.taskStore.updateTitle(this.taskId, title);
  }

  updateDueDate(dueDate: Date) {
    this.taskStore.updateDueDate(this.taskId, dueDate);
  }

  clearDueDate() {
    this.taskStore.clearDueDate(this.taskId);
  }

  removeTask() {
    this.taskStore.removeTask(this.taskId);
  }

  get title() {
    return this.task.title;
  }

  get completed() {
    return this.task.completed;
  }

  get dueDate() {
    return this.task.dueDate;
  }
}
