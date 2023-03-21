import { isSameDay } from "date-fns";
import { makeAutoObservable } from "mobx";
import { HabitStore, habitStore } from "./habit-store";

export type HabitViewModel = {
  id: string;
  title: string;
  isCompletedForSelectedDate: boolean;
};

export class HabitListPresenter {
  selectedDate: Date = new Date();

  constructor(private habitStore: HabitStore) {
    makeAutoObservable(this);
  }

  addHabit(title: string) {
    return this.habitStore.addHabit(title);
  }

  toggleCompletedForSelectedDate(habitId: string) {
    this.habitStore.toggleHabitCompletedForSelectedDate(
      habitId,
      this.selectedDate
    );
  }

  get habits(): HabitViewModel[] {
    return this.habitStore.habits.map((habit) => ({
      id: habit.id,
      title: habit.title,
      isCompletedForSelectedDate: this.habitStore.completions.some(
        (completion) =>
          completion.habitId === habit.id &&
          isSameDay(completion.date, this.selectedDate)
      ),
    }));
  }
}

export const createHabitListPresenter = () =>
  new HabitListPresenter(habitStore);
