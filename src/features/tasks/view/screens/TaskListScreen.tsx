import { Stack } from 'expo-router';
import { TaskList } from '../components/TaskList';
import { TaskListPresenterProvider } from '../hooks/useTaskListPresenter';

export const TaskListScreen = () => {
  return (
    <TaskListPresenterProvider>
      <Stack.Screen options={{ title: 'Tasks' }} />
      <TaskList />
    </TaskListPresenterProvider>
  );
};
