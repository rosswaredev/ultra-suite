import { useRef } from 'react';
import { rootStore } from '../../../../init';
import { TaskDetailPresenter } from '../../presenters/task-detail-presenter';

export const useTaskDetailPresenter = (taskId: string) => {
  const taskDetailPresenter = useRef(
    new TaskDetailPresenter(rootStore.taskStore, taskId)
  ).current;
  return taskDetailPresenter;
};
