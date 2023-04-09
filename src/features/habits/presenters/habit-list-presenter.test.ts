import { HabitStore } from '../habit-store';
import { HabitListPresenter } from './habit-list-presenter';

describe('HabitListPresenter', () => {
  it('should add a habit', () => {
    const habitStore = new HabitStore({});
    const habitListPresenter = new HabitListPresenter(habitStore);

    habitListPresenter.addHabit('test habit');

    expect(habitListPresenter.habits.length).toEqual(1);
  });

  it('complete habit for today', () => {
    const habitStore = new HabitStore({});
    const habitListPresenter = new HabitListPresenter(habitStore);
    habitListPresenter.addHabit('test habit');
    let habitViewModel = habitListPresenter.habits[0];

    habitViewModel.toggleCompleted();
    habitViewModel = habitListPresenter.habits[0];

    expect(habitViewModel.isCompletedForSelectedDate).toBeTruthy();
  });

  it('when completion is for other day, habit is not completed for today', () => {
    const habitStore = new HabitStore({});
    const habitListPresenter = new HabitListPresenter(habitStore);
    habitListPresenter.addHabit('test habit');
    let habitViewModel = habitListPresenter.habits[0];

    habitViewModel.toggleCompleted();
    habitListPresenter.selectDate(new Date(2020, 1, 1));

    habitViewModel = habitListPresenter.habits[0];

    expect(habitViewModel.isCompletedForSelectedDate).toBeFalsy();
  });

  it('when completion is for other day, habit is completed for that day', () => {
    const habitStore = new HabitStore({});
    const habitListPresenter = new HabitListPresenter(habitStore);
    habitListPresenter.addHabit('test habit');
    habitListPresenter.selectDate(new Date(2020, 1, 1));
    let habitViewModel = habitListPresenter.habits[0];

    habitViewModel.toggleCompleted();
    habitViewModel = habitListPresenter.habits[0];

    expect(habitViewModel.isCompletedForSelectedDate).toBeTruthy();
  });
});
