import { HabitStore } from "../habit-store";
import { HabitListPresenter } from "./habit-list-presenter";

const setup = () => {
  const habitStore = new HabitStore({});
  const habitListPresenter = new HabitListPresenter(habitStore);

  return { habitStore, habitListPresenter };
};

describe("HabitListPresenter", () => {
  it("should add a habit", () => {
    const { habitListPresenter } = setup();

    habitListPresenter.addHabit("test habit", 1, 7);

    expect(habitListPresenter.habits.length).toEqual(1);
  });

  it("complete habit for today", () => {
    const { habitListPresenter } = setup();
    habitListPresenter.addHabit("test habit", 1, 7);
    let habitViewModel = habitListPresenter.habits[0];

    habitViewModel.toggleCompleted();
    habitViewModel = habitListPresenter.habits[0];

    expect(habitViewModel.isCompletedForSelectedDate).toBeTruthy();
  });

  it("should indicate if there are no habits", () => {
    const { habitListPresenter } = setup();

    expect(habitListPresenter.hasHabits).toBeFalsy();
  });

  it("should indicate if there are habits", () => {
    const { habitListPresenter } = setup();
    habitListPresenter.addHabit("test habit", 1, 7);

    expect(habitListPresenter.hasHabits).toBeTruthy();
  });

  it("when completion is for other day, habit is not completed for today", () => {
    const { habitListPresenter } = setup();
    habitListPresenter.addHabit("test habit", 1, 7);
    let habitViewModel = habitListPresenter.habits[0];

    habitViewModel.toggleCompleted();
    habitListPresenter.selectDate(new Date(2020, 1, 1));

    habitViewModel = habitListPresenter.habits[0];

    expect(habitViewModel.isCompletedForSelectedDate).toBeFalsy();
  });

  it("when completion is for other day, habit is completed for that day", () => {
    const { habitListPresenter } = setup();
    habitListPresenter.addHabit("test habit", 1, 7);
    habitListPresenter.selectDate(new Date(2020, 1, 1));
    let habitViewModel = habitListPresenter.habits[0];

    habitViewModel.toggleCompleted();
    habitViewModel = habitListPresenter.habits[0];

    expect(habitViewModel.isCompletedForSelectedDate).toBeTruthy();
  });
});
