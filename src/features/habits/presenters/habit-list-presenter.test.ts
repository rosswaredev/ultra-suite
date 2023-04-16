import { subDays } from 'date-fns';
import { HabitStore } from '../habit-store';
import { HabitListPresenter } from './habit-list-presenter';

const setup = () => {
  const habitStore = new HabitStore({});
  const habitListPresenter = new HabitListPresenter(habitStore);

  return { habitStore, habitListPresenter };
};

describe('HabitListPresenter', () => {
  it('should add a habit', () => {
    const { habitListPresenter } = setup();

    habitListPresenter.addHabit('test habit', 1, 7);

    expect(habitListPresenter.habits.length).toEqual(1);
  });

  it('should display all details of a habit', () => {
    const { habitListPresenter } = setup();

    habitListPresenter.addHabit('test habit', 1, 7);

    const habitViewModel = habitListPresenter.habits[0];

    expect(habitViewModel).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        title: 'test habit',
        isCompletedForSelectedDate: false,
        score: 0,
      })
    );
  });

  it('complete habit for today', () => {
    const { habitListPresenter } = setup();
    habitListPresenter.addHabit('test habit', 1, 7);
    let habitViewModel = habitListPresenter.habits[0];

    habitViewModel.toggleCompleted();
    habitViewModel = habitListPresenter.habits[0];

    expect(habitViewModel.isCompletedForSelectedDate).toBeTruthy();
  });

  it('should indicate if there are no habits', () => {
    const { habitListPresenter } = setup();

    expect(habitListPresenter.hasHabits).toBeFalsy();
  });

  it('should indicate if there are habits', () => {
    const { habitListPresenter } = setup();
    habitListPresenter.addHabit('test habit', 1, 7);

    expect(habitListPresenter.hasHabits).toBeTruthy();
  });

  it('when completion is for other day, habit is not completed for today', () => {
    const { habitListPresenter } = setup();
    habitListPresenter.addHabit('test habit', 1, 7);
    let habitViewModel = habitListPresenter.habits[0];

    habitViewModel.toggleCompleted();
    habitListPresenter.selectDate(new Date(2020, 1, 1));

    habitViewModel = habitListPresenter.habits[0];

    expect(habitViewModel.isCompletedForSelectedDate).toBeFalsy();
  });

  it('when completion is for other day, habit is completed for that day', () => {
    const { habitListPresenter } = setup();
    habitListPresenter.addHabit('test habit', 1, 7);
    habitListPresenter.selectDate(new Date(2020, 1, 1));
    let habitViewModel = habitListPresenter.habits[0];

    habitViewModel.toggleCompleted();
    habitViewModel = habitListPresenter.habits[0];

    expect(habitViewModel.isCompletedForSelectedDate).toBeTruthy();
  });

  describe('score', () => {
    describe('when target is daily', () => {
      it('should be 0 when no completions', () => {
        const { habitListPresenter } = setup();
        habitListPresenter.addHabit('test habit', 1, 1);
        const habitViewModel = habitListPresenter.habits[0];

        expect(habitViewModel.score).toEqual(0);
      });

      it('should be 5% when 1 completion', () => {
        const { habitListPresenter } = setup();
        habitListPresenter.addHabit('test habit', 1, 1);
        let habitViewModel = habitListPresenter.habits[0];

        habitViewModel.toggleCompleted();
        habitViewModel = habitListPresenter.habits[0];

        expect(habitViewModel.score).toBe(5);
      });

      it('should be 9% when 2 completions', () => {
        const { habitListPresenter } = setup();
        habitListPresenter.addHabit('test habit', 1, 1);
        let habitViewModel = habitListPresenter.habits[0];

        habitViewModel.toggleCompleted();
        habitListPresenter.selectDate(subDays(new Date(), 1));
        habitViewModel.toggleCompleted();

        habitViewModel = habitListPresenter.habits[0];
        expect(habitViewModel.score).toBe(10);
      });

      it('should be 14% when 3 completions', () => {
        const { habitListPresenter } = setup();
        habitListPresenter.addHabit('test habit', 1, 1);
        let habitViewModel = habitListPresenter.habits[0];

        habitViewModel.toggleCompleted();
        habitListPresenter.selectDate(subDays(new Date(), 1));
        habitViewModel.toggleCompleted();
        habitListPresenter.selectDate(subDays(new Date(), 2));
        habitViewModel.toggleCompleted();

        habitViewModel = habitListPresenter.habits[0];
        expect(habitViewModel.score).toBe(14);
      });

      it('should be 4% when 1 completion and 2 missed', () => {
        const { habitListPresenter } = setup();
        habitListPresenter.addHabit('test habit', 1, 1);
        let habitViewModel = habitListPresenter.habits[0];

        habitListPresenter.selectDate(subDays(new Date(), 2));
        habitViewModel.toggleCompleted();

        habitViewModel = habitListPresenter.habits[0];
        expect(habitViewModel.score).toBe(4);
      });
    });
  });
});
