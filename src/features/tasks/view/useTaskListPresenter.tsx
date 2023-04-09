import { createContext, PropsWithChildren, useContext } from 'react';
import { rootStore } from '../../../init';
import { TaskListPresenter } from '../task-list-presenter';

const taskListPresenter = new TaskListPresenter(rootStore.taskStore);

// TODO Remove
// taskListPresenter.addTask('Walk the cat');
// taskListPresenter.addTask('Take out the trash');

const TaskListPresenterContext = createContext<TaskListPresenter | null>(null);

export const TaskListPresenterProvider = ({
  children,
}: PropsWithChildren<unknown>) => {
  return (
    <TaskListPresenterContext.Provider value={taskListPresenter}>
      {children}
    </TaskListPresenterContext.Provider>
  );
};

export const useTaskListPresenter = () => {
  const context = useContext(TaskListPresenterContext);

  if (context === null) {
    throw new Error(
      'useTaskListPresenter must be used within a TaskListPresenterProvider'
    );
  }

  return context;
};
