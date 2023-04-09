import { useRef } from 'react';
import { rootStore } from '../../../../init';
import { HabitDetailPresenter } from '../../presenters/habit-detail-presenter';

export const useHabitDetailPresenter = (taskId: string) => {
  const habitDetailPresenter = useRef(
    new HabitDetailPresenter(rootStore.habitStore, taskId)
  ).current;
  return habitDetailPresenter;
};
