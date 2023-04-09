import { Stack } from 'expo-router';
import { TaskList } from './TaskList';
import { TaskListPresenterProvider } from './useTaskListPresenter';

export const TaskListScreen = () => {
  return (
    <TaskListPresenterProvider>
      <Stack.Screen options={{ title: 'Tasks' }} />
      <TaskList />
    </TaskListPresenterProvider>
  );
};
