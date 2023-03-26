import { isSameDay } from "date-fns";
import {
  getParent,
  getRoot,
  idProp,
  model,
  Model,
  modelAction,
  prop,
  timestampToDateTransform,
} from "mobx-keystone";

@model("app/Habit")
export class Habit extends Model({
  id: idProp,
  title: prop<string>(),
}) {}

@model("app/HabitCompletion")
export class HabitCompletion extends Model({
  id: idProp,
  habitId: prop<string>(),
  date: prop<number>().withTransform(timestampToDateTransform()),
}) {}

@model("appp/HabitStore")
class HabitStore extends Model({
  habits: prop<Habit[]>(() => []),
  completions: prop<HabitCompletion[]>(() => []),
}) {
  @modelAction
  addHabit(title: string) {
    const habit = new Habit({ title });
    this.habits.push(habit);
  }

  @modelAction
  toggleHabitCompletedForSelectedDate(habitId: string, date: Date) {
    const habit = this.habits.find((h) => h.id === habitId);
    if (!habit) return;

    const existingCompletionForHabitOnDate = this.completions.find(
      (completion) =>
        completion.habitId === habitId && isSameDay(completion.date, date)
    );

    if (existingCompletionForHabitOnDate) {
      this.completions = this.completions.filter(
        (completion) => completion.id !== existingCompletionForHabitOnDate.id
      );
    } else {
      this.completions.push(new HabitCompletion({ habitId, date }));
    }
  }
}



export { HabitStore };
