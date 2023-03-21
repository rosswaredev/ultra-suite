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
  habitListPresenter.addHabit("test habit");
  let habitViewModel = habitListPresenter.habits[0];

  habitViewModel.toggleCompleted();
  habitViewModel = habitListPresenter.habits[0];

  expect(habitViewModel.isCompletedForSelectedDate).toBeTruthy();
});
