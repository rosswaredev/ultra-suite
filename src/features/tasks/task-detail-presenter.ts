import { makeAutoObservable } from 'mobx';
import { Task, TaskStore } from './task-store';

export class TaskDetailPresenter {
  private task: Task;

  constructor(private taskStore: TaskStore, private taskId: string) {
    makeAutoObservable(this);
    this.task = taskStore.tasks.find((task) => task.id === taskId);
  }

  get title() {
    return this.task.title;
  }

  get completed() {
    return this.task.completed;
  }
}
