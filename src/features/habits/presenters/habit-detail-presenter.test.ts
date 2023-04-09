import { HabitStore } from '../habit-store';
import { HabitDetailPresenter } from './habit-detail-presenter';

const setup = () => {
  const habitStore = new HabitStore({});
  const habitId = habitStore.addHabit('test habit', 1, 2);
  const habitDetailPresenter = new HabitDetailPresenter(habitStore, habitId);
  return { habitDetailPresenter, habitStore, habitId };
};

describe('HabitDetailPresenter', () => {
  it('should display details', () => {
    const { habitDetailPresenter } = setup();

    expect(habitDetailPresenter.title).toBe('test habit');
    expect(habitDetailPresenter.targetCount).toBe(1);
    expect(habitDetailPresenter.targetPeriod).toBe(2);
  });

  it('should update title', () => {
    const { habitDetailPresenter } = setup();

    habitDetailPresenter.updateTitle('new title');

    expect(habitDetailPresenter.title).toBe('new title');
  });

  it('should remove habit', () => {
    const { habitDetailPresenter, habitStore, habitId } = setup();

    habitDetailPresenter.removeHabit();
    const maybeHabit = habitStore.habits.find((task) => task.id === habitId);

    expect(maybeHabit).toBeUndefined();
  });
});
