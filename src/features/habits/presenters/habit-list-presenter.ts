import { differenceInDays, isSameDay } from 'date-fns';
import { makeAutoObservable } from 'mobx';
import { HabitStore } from '../habit-store';

export type HabitViewModel = {
  id: string;
  title: string;
  score: number;
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
    console.log(this.selectedDate);
    this.habitStore.toggleHabitCompletedForSelectedDate(
      habitId,
      new Date(this.selectedDate)
    );
  }

  selectDate(date: Date) {
    this.selectedDate = new Date(date).toISOString();
  }

  get habits(): HabitViewModel[] {
    return this.habitStore.habits.map((habit) => {
      const frequency = habit.targetCount / habit.targetPeriod;
      const multiplier = 0.5 ** (Math.sqrt(frequency) / 13.0); //?

      const sortedCompletionsForHabit = this.habitStore.completions
        .filter((completion) => completion.habitId === habit.id)
        .sort((a, b) => (a.date > b.date ? 1 : -1));

      const { previousScore: score, previousCompletionDate } =
        sortedCompletionsForHabit.reduce(
          ({ previousScore, previousCompletionDate }, completion) => {
            console.log(previousCompletionDate);
            if (previousCompletionDate === null) {
              return {
                previousScore: 1 - multiplier,
                previousCompletionDate: completion.date,
              };
            }

            return {
              previousScore: previousScore * multiplier + (1 - multiplier),
              previousCompletionDate: completion.date,
            };
          },
          { previousScore: 0, previousCompletionDate: null }
        );

      const daysSinceLastCompletion = previousCompletionDate
        ? differenceInDays(new Date(), previousCompletionDate)
        : 0; //?

      return {
        id: habit.id,
        title: habit.title,
        score: Math.floor(score * multiplier ** daysSinceLastCompletion * 100),
        isCompletedForSelectedDate: this.habitStore.completions.some(
          (completion) =>
            completion.habitId === habit.id &&
            isSameDay(completion.date, new Date(this.selectedDate))
        ),
        toggleCompleted: () => this.toggleCompletedForSelectedDate(habit.id),
      };
    });
  }

  get hasHabits() {
    return this.habits.length > 0;
  }
}
