import { TaskDetailPresenter } from "./task-detail-presenter";
import { TaskStore } from "../task-store";
import { isSameDay } from "date-fns";

const setup = () => {
  const taskStore = new TaskStore({});
  const taskId = taskStore.addTask("test task", new Date());
  const taskDetailPresenter = new TaskDetailPresenter(taskStore, taskId);
  return { taskDetailPresenter, taskStore, taskId };
};

describe("TaskDetailPresenter", () => {
  it("should display task details", () => {
    const { taskDetailPresenter } = setup();

    expect(taskDetailPresenter.title).toBe("test task");
    expect(taskDetailPresenter.completed).toBe(false);
    expect(isSameDay(taskDetailPresenter.dueDate, new Date())).toBeTruthy();
  });

  it("should toggle completion", () => {
    const { taskDetailPresenter } = setup();

    taskDetailPresenter.toggleCompletion();
    expect(taskDetailPresenter.completed).toBe(true);
  });

  it("should update title", () => {
    const { taskDetailPresenter } = setup();

    taskDetailPresenter.updateTitle("new title");
    expect(taskDetailPresenter.title).toBe("new title");
  });

  it("should update due date", () => {
    const { taskDetailPresenter } = setup();

    const newDueDate = new Date();
    taskDetailPresenter.updateDueDate(newDueDate);
    expect(isSameDay(taskDetailPresenter.dueDate, newDueDate)).toBeTruthy();
  });

  it("should clear due date", () => {
    const { taskDetailPresenter } = setup();

    taskDetailPresenter.clearDueDate();

    expect(taskDetailPresenter.dueDate).toBeNull();
  });

  it("should remove task", () => {
    const { taskDetailPresenter, taskStore, taskId } = setup();

    taskDetailPresenter.removeTask();
    const maybeTask = taskStore.tasks.find((task) => task.id === taskId);

    expect(maybeTask).toBeUndefined();
  });
});
