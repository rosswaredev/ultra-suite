import { makeAutoObservable } from 'mobx';
import { Task, TaskStore } from './task-store';

export class TaskDetailPresenter {
  private task: Task;

  constructor(private taskStore: TaskStore, private taskId: string) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.task = taskStore.tasks.find((task) => task.id === taskId);
  }

  get title() {
    return this.task.title;
  }

  get completed() {
    return this.task.completed;
  }

  toggleCompletion() {
    this.taskStore.toggleCompletion(this.taskId);
  }

  updateTitle(title: string) {
    this.taskStore.updateTitle(this.taskId, title);
  }

  removeTask() {
    this.taskStore.removeTask(this.taskId);
  }
}
