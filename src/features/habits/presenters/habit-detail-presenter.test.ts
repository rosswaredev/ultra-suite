import { HabitStore } from '../habit-store';
import { HabitDetailPresenter } from './habit-detail-presenter';

const setup = () => {
  const habitStore = new HabitStore({});
  const habitId = habitStore.addHabit('test habit');
  const habitDetailPresenter = new HabitDetailPresenter(habitStore, habitId);
  return { habitDetailPresenter };
};

describe('HabitDetailPresenter', () => {
  it('should update title', () => {
    const { habitDetailPresenter } = setup();

    habitDetailPresenter.updateTitle('new title');

    expect(habitDetailPresenter.title).toBe('new title');
  });
});
