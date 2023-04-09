import { makeAutoObservable } from 'mobx';
import { TaskStore } from './task-store';

class TaskDetailPresenter {
  constructor(private taskStore: TaskStore, private taskId: string) {
    makeAutoObservable(this);
  }

  get title() {
    return this.taskStore.tasks.find((task) => task.id === this.taskId)?.title;
  }

  get completed() {
    return this.taskStore.tasks.find((task) => task.id === this.taskId)
      ?.completed;
  }
}

const setup = () => {
  const taskStore = new TaskStore({});
  const taskId = taskStore.addTask('test task');
  const taskDetailPresenter = new TaskDetailPresenter(taskStore, taskId);
  return { taskDetailPresenter };
};

describe('TaskDetailPresenter', () => {
  it('should display title and completed', () => {
    const { taskDetailPresenter } = setup();

    expect(taskDetailPresenter.title).toBe('test task');
    expect(taskDetailPresenter.completed).toBe(false);
  });

  it.todo('should toggle completed');
  it.todo('should update title');
  it.todo('should delete task');
});
