import { Model, model, prop } from 'mobx-keystone';
import { HabitStore } from './features/habits/habit-store';
import { TaskStore } from './features/tasks/task-store';

@model('app/RootStore')
export class RootStore extends Model({
  taskStore: prop<TaskStore>().withSetter(),
  habitStore: prop<HabitStore>().withSetter(),
}) {}
