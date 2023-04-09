import { makeAutoObservable } from 'mobx';
import { Habit, HabitStore } from '../habit-store';

export class HabitDetailPresenter {
  private habit: Habit;
  constructor(private habitStore: HabitStore, private habitId: string) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.habit = this.habitStore.habits.find((h) => h.id === habitId);
  }

  get title() {
    return this.habit.title;
  }

  get targetCount() {
    return this.habit.targetCount;
  }

  get targetPeriod() {
    return this.habit.targetPeriod;
  }

  updateTitle(title: string) {
    this.habitStore.updateHabitTitle(this.habitId, title);
  }

  removeHabit() {
    this.habitStore.removeHabit(this.habitId);
  }
}
