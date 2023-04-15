import { TaskListPresenter } from './task-list-presenter';
import { TaskStore } from '../task-store';

const setup = () => {
  const taskStore = new TaskStore({});
  const taskListPresenter = new TaskListPresenter(taskStore);
  return { taskStore, taskListPresenter };
};

describe('TaskListPresenter', () => {
  it('should add a task', () => {
    const { taskListPresenter } = setup();

    taskListPresenter.addTask('test task', new Date());

    expect(taskListPresenter.tasks).toHaveLength(1);
  });

  it('should add a task without a due date', () => {
    const { taskListPresenter } = setup();

    const taskId = taskListPresenter.addTask('test task', null);

    expect(taskListPresenter.tasks).toContainEqual(
      expect.objectContaining({ id: taskId, dueDate: null })
    );
  });

  it('should delete a task', () => {
    const { taskListPresenter } = setup();
    taskListPresenter.addTask('test task', new Date());
    const taskId = taskListPresenter.addTask('test task 2', new Date());

    taskListPresenter.removeTask(taskId);

    expect(taskListPresenter.tasks).not.toContainEqual(
      expect.objectContaining({ id: taskId })
    );
  });

  it('should toggle completion', () => {
    const { taskListPresenter } = setup();
    const taskId = taskListPresenter.addTask('test task', new Date());

    taskListPresenter.toggleCompletion(taskId);

    const task = taskListPresenter.tasks.find((task) => task.id === taskId);
    expect(task?.completed).toBe(true);
  });

  it('should indicate if there are no tasks', () => {
    const { taskListPresenter } = setup();

    expect(taskListPresenter.hasTasks).toBe(false);
  });

  it('should indicate if there are tasks', () => {
    const { taskListPresenter } = setup();
    taskListPresenter.addTask('test task', new Date());

    expect(taskListPresenter.hasTasks).toBe(true);
  });

  describe('today', () => {
    it('should return tasks with a due date of today', () => {
      const { taskListPresenter } = setup();
      taskListPresenter.addTask('test task', new Date());
      taskListPresenter.addTask('test task 2', new Date('2020-01-01'));

      expect(taskListPresenter.today).toHaveLength(1);
    });
  });
});
