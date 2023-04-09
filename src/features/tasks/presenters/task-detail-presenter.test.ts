import { TaskDetailPresenter } from './task-detail-presenter';
import { TaskStore } from '../task-store';

const setup = () => {
  const taskStore = new TaskStore({});
  const taskId = taskStore.addTask('test task');
  const taskDetailPresenter = new TaskDetailPresenter(taskStore, taskId);
  return { taskDetailPresenter, taskStore, taskId };
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

  it('should update title', () => {
    const { taskDetailPresenter } = setup();

    taskDetailPresenter.updateTitle('new title');
    expect(taskDetailPresenter.title).toBe('new title');
  });

  it('should remove task', () => {
    const { taskDetailPresenter, taskStore, taskId } = setup();

    taskDetailPresenter.removeTask();
    const maybeTask = taskStore.tasks.find((task) => task.id === taskId);

    expect(maybeTask).toBeUndefined();
  });
});
