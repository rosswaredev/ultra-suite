import { TaskListPresenter } from "./task-list-presenter";
import { TaskStore } from "../task-store";

const setup = () => {
  const taskStore = new TaskStore({});
  const taskListPresenter = new TaskListPresenter(taskStore);
  return { taskStore, taskListPresenter };
};

describe("TaskListPresenter", () => {
  it("should add a task", () => {
    const { taskListPresenter } = setup();

    taskListPresenter.addTask("test task");

    expect(taskListPresenter.tasks).toHaveLength(1);
  });

  it("should delete a task", () => {
    const { taskListPresenter } = setup();
    taskListPresenter.addTask("test task");
    const taskId = taskListPresenter.addTask("test task 2");

    taskListPresenter.removeTask(taskId);

    expect(taskListPresenter.tasks).not.toContainEqual(
      expect.objectContaining({ id: taskId })
    );
  });

  it("should toggle completion", () => {
    const { taskListPresenter } = setup();
    const taskId = taskListPresenter.addTask("test task");

    taskListPresenter.toggleCompletion(taskId);

    const task = taskListPresenter.tasks.find((task) => task.id === taskId);
    expect(task?.completed).toBe(true);
  });

  it("should indicate if there are no tasks", () => {
    const { taskListPresenter } = setup();

    expect(taskListPresenter.hasTasks).toBe(false);
  });

  it("should indicate if there are tasks", () => {
    const { taskListPresenter } = setup();
    taskListPresenter.addTask("test task");

    expect(taskListPresenter.hasTasks).toBe(true);
  });
});
