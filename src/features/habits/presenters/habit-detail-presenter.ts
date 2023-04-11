import { makeAutoObservable } from "mobx";
import { Habit, HabitStore } from "../habit-store";

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

  updateTargetCount(targetCount: number) {
    this.habitStore.updateHabitTargetCount(this.habitId, targetCount);
  }

  updateTargetPeriod(targetPeriod: number) {
    this.habitStore.updateHabitTargetPeriod(this.habitId, targetPeriod);
  }

  removeHabit() {
    this.habitStore.removeHabit(this.habitId);
  }
}
