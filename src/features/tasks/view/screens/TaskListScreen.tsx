import { Stack } from 'expo-router';
import { ListType, TaskList } from '../components/TaskList';
import { TaskListPresenterProvider } from '../hooks/useTaskListPresenter';
import { useParam } from 'src/hooks/useParam';
import { capitalize } from 'src/utils';

export const TaskListScreen = () => {
  const list = (useParam('list') as ListType) ?? ListType.inbox;
  return (
    <TaskListPresenterProvider>
      <Stack.Screen options={{ title: capitalize(list) }} />
      <TaskList list={list} />
    </TaskListPresenterProvider>
  );
};
