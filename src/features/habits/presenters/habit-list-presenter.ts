import { isSameDay } from "date-fns";
import { makeAutoObservable } from "mobx";
import { HabitStore } from "../habit-store";

export type HabitViewModel = {
  id: string;
  title: string;
  isCompletedForSelectedDate: boolean;
  toggleCompleted: () => void;
};

export class HabitListPresenter {
  selectedDate = new Date().toISOString();

  constructor(private habitStore: HabitStore) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  addHabit(
    title: string,
    targetCompletionCount: number,
    targetCompletionPeriod: number
  ) {
    return this.habitStore.addHabit(
      title,
      targetCompletionCount,
      targetCompletionPeriod
    );
  }

  toggleCompletedForSelectedDate(habitId: string) {
    this.habitStore.toggleHabitCompletedForSelectedDate(
      habitId,
      new Date(this.selectedDate)
    );
  }

  selectDate(date: Date) {
    this.selectedDate = new Date(date).toISOString();
  }

  get habits(): HabitViewModel[] {
    return this.habitStore.habits.map((habit) => ({
      id: habit.id,
      title: habit.title,
      isCompletedForSelectedDate: this.habitStore.completions.some(
        (completion) =>
          completion.habitId === habit.id &&
          isSameDay(completion.date, new Date(this.selectedDate))
      ),
      toggleCompleted: () => this.toggleCompletedForSelectedDate(habit.id),
    }));
  }

  get hasHabits() {
    return this.habits.length > 0;
  }
}
