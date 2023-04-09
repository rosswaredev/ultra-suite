import { TaskDetailPresenter } from './task-detail-presenter';
import { TaskStore } from './task-store';

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

  it('should toggle completion', () => {
    const { taskDetailPresenter } = setup();

    taskDetailPresenter.toggleCompletion();
    expect(taskDetailPresenter.completed).toBe(true);
  });

  it.todo('should update title');
  it.todo('should delete task');
});
