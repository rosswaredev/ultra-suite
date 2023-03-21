import { HabitStore } from "./habit-store";
import { HabitListPresenter } from "./habit-list-presenter";

it("should add a habit", () => {
  const habitStore = new HabitStore({});
  const habitListPresenter = new HabitListPresenter(habitStore);

  habitListPresenter.addHabit("test habit");

  expect(habitListPresenter.habits.length).toEqual(1);
});

it("complete habit for today", () => {
  const habitStore = new HabitStore({});
  const habitListPresenter = new HabitListPresenter(habitStore);
  const habitId = habitListPresenter.addHabit("test habit");

  habitListPresenter.toggleCompletedForSelectedDate(habitId);
  const habit = habitListPresenter.habits[0];

  expect(habit.isCompletedForSelectedDate).toBeTruthy();
});
