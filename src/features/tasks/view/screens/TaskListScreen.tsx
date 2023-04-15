import { Stack } from 'expo-router';
import { ListType, TaskList } from '../components/TaskList';
import { TaskListPresenterProvider } from '../hooks/useTaskListPresenter';
import { useParam } from 'src/hooks/useParam';

export const TaskListScreen = () => {
  const list = useParam('list') as ListType;
  return (
    <TaskListPresenterProvider>
      <Stack.Screen options={{ title: 'Tasks' }} />
      <TaskList list={list} />
    </TaskListPresenterProvider>
  );
};
