import { makeAutoObservable } from 'mobx';
import { TaskStore } from './task-store';
import { TaskViewModel } from './view/TaskList';

export class TaskListPresenter {
  constructor(private taskStore: TaskStore) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  addTask(title: string) {
    return this.taskStore.addTask(title);
  }

  removeTask(id: string) {
    this.taskStore.removeTask(id);
  }

  toggleCompletion(id: string) {
    this.taskStore.toggleCompletion(id);
  }

  get tasks(): TaskViewModel[] {
    return this.taskStore.tasks.slice();
  }
}
