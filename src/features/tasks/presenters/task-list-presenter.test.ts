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

  it('should reorder tasks', () => {
    const { taskListPresenter } = setup();
    const taskId1 = taskListPresenter.addTask('test task 1', new Date());
    const taskId2 = taskListPresenter.addTask('test task 2', new Date());
    const taskId3 = taskListPresenter.addTask('test task 3', new Date());

    taskListPresenter.reorderTasks([taskId3, taskId2, taskId1]);

    expect(taskListPresenter.tasks).toEqual([
      expect.objectContaining({ id: taskId3 }),
      expect.objectContaining({ id: taskId2 }),
      expect.objectContaining({ id: taskId1 }),
    ]);
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

  describe('inbox', () => {
    it('should return tasks without a due date', () => {
      const { taskListPresenter } = setup();
      taskListPresenter.addTask('task without date', null);
      taskListPresenter.addTask('test with date', new Date());

      expect(taskListPresenter.inbox).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ title: 'task without date' }),
        ])
      );
    });
  });

  describe('today', () => {
    it('should return tasks with a due date of today', () => {
      const { taskListPresenter } = setup();
      taskListPresenter.addTask('task due today', new Date());
      taskListPresenter.addTask(
        'task due another time',
        new Date('2020-01-01')
      );

      expect(taskListPresenter.today).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ title: 'task due today' }),
        ])
      );
    });
  });

  describe('upcoming', () => {
    it('should return tasks with a due date', () => {
      const { taskListPresenter } = setup();
      taskListPresenter.addTask('task with due date', new Date('2030-01-01'));
      taskListPresenter.addTask('task without due date', null);

      expect(taskListPresenter.upcoming).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ title: 'task with due date' }),
        ])
      );
    });

    it('should sort tasks by due date', () => {
      const { taskListPresenter } = setup();
      taskListPresenter.addTask('task due second', new Date('2030-01-02'));
      taskListPresenter.addTask('task due first', new Date('2030-01-01'));

      expect(taskListPresenter.upcoming).toEqual([
        expect.objectContaining({ title: 'task due first' }),
        expect.objectContaining({ title: 'task due second' }),
      ]);
    });
  });

  describe('completed', () => {
    it('should return completed tasks', () => {
      const { taskListPresenter } = setup();
      const taskId = taskListPresenter.addTask('test task', new Date());
      taskListPresenter.toggleCompletion(taskId);

      expect(taskListPresenter.completed).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ title: 'test task' }),
        ])
      );
    });
  });
});
