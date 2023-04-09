import { Model, idProp, model, modelAction, prop } from 'mobx-keystone';

@model('app/Task')
class Task extends Model({
  id: idProp,
  title: prop<string>(),
  completed: prop<boolean>(() => false),
}) {}

@model('app/TaskStore')
export class TaskStore extends Model({
  tasks: prop<Task[]>(() => []),
}) {
  @modelAction
  addTask(title: string) {
    const newTask = new Task({ title });
    this.tasks.push(newTask);
    return newTask.id;
  }

  @modelAction
  removeTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  @modelAction
  toggleCompletion(id: string) {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      task.completed = !task.completed;
    }
  }
}
