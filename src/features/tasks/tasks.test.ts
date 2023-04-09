

import { makeAutoObservable } from "mobx";
import { Model, idProp, model, modelAction, prop } from "mobx-keystone";

@model('app/Task')
class Task extends Model({
  id: idProp,
  title: prop<string>(),
  completed: prop<boolean>(() => false),
}) {}

@model('app/TaskStore')
class TaskStore extends Model({
  tasks: prop<Task[]>(() => [])
}) {

  @modelAction
  addTask(title: string) {
    const newTask = new Task({ title });
    this.tasks.push(newTask)
    return newTask.id;
  }

  @modelAction
  removeTask(id: string) {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  @modelAction
  toggleCompletion(id: string) {
    const task = this.tasks.find(task => task.id === id);
    if (task) {
      task.completed = !task.completed;
    }
  }
}

class TaskListPresenter {
  constructor(private taskStore: TaskStore) {
    makeAutoObservable(this);
  }

  addTask(title: string) {
    return this.taskStore.addTask(title)
  }

  removeTask(id: string) {
    this.taskStore.removeTask(id);
  }

  toggleCompletion(id: string) {
    this.taskStore.toggleCompletion(id);
  }

  get tasks() {
    return this.taskStore.tasks
  }
}

const setup = () => {
  const taskStore = new TaskStore({});
  const taskListPresenter = new TaskListPresenter(taskStore);
  return { taskStore, taskListPresenter };
}

it('should add a task', () => {
  const { taskListPresenter } = setup()

  taskListPresenter.addTask('test task');

  expect(taskListPresenter.tasks).toHaveLength(1)
});

it('should delete a task', () => {
  const { taskListPresenter } = setup()
  taskListPresenter.addTask('test task');
  const taskId = taskListPresenter.addTask('test task 2');

  taskListPresenter.removeTask(taskId);

  expect(taskListPresenter.tasks).not.toContainEqual(expect.objectContaining({ id: taskId }));
});

it('should toggle completion', () => {
  const { taskListPresenter } = setup()
  const taskId = taskListPresenter.addTask('test task');

  taskListPresenter.toggleCompletion(taskId);

  const task = taskListPresenter.tasks.find(task => task.id === taskId);
  expect(task?.completed).toBe(true);
})

it.todo('should update title');
// , () => {
//   const { taskListPresenter } = setup()
//   const taskId = taskListPresenter.addTask('test task');

//   taskListPresenter.updateTitle(taskId, 'new title');

//   const task = taskListPresenter.tasks.find(task => task.id === taskId);
//   expect(task?.title).toBe('new title');
// })