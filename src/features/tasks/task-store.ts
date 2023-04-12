import {
  Model,
  idProp,
  model,
  modelAction,
  prop,
  timestampToDateTransform,
} from "mobx-keystone";

@model("app/Task")
export class Task extends Model({
  id: idProp,
  title: prop<string>(),
  completed: prop<boolean>(() => false),
  dueDate: prop<number | undefined>().withTransform(timestampToDateTransform()),
}) {}

@model("app/TaskStore")
export class TaskStore extends Model({
  tasks: prop<Task[]>(() => []),
}) {
  @modelAction
  addTask(title: string, dueDate: Date) {
    const newTask = new Task({ title, dueDate });
    this.tasks.push(newTask);
    return newTask.id;
  }

  @modelAction
  updateTitle(id: string, title: string) {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      task.title = title;
    }
  }

  @modelAction
  updateDueDate(id: string, dueDate: Date) {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      task.dueDate = dueDate;
    }
  }

  @modelAction
  toggleCompletion(id: string) {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      task.completed = !task.completed;
    }
  }

  @modelAction
  removeTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
