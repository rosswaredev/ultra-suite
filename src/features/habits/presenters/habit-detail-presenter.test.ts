import { makeAutoObservable } from 'mobx';
import { Habit, HabitStore } from '../habit-store';

class HabitDetailPresenter {
  private habit: Habit;
  constructor(private habitStore: HabitStore, private habitId: string) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.habit = this.habitStore.habits.find((h) => h.id === habitId);
  }

  get title() {
    return this.habit.title;
  }

  updateTitle(title: string) {
    this.habitStore.updateHabitTitle(this.habitId, title);
  }
}

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
