import { Stack } from 'expo-router';
import { ListType, TaskList } from '../components/TaskList';
import { TaskListPresenterProvider } from '../hooks/useTaskListPresenter';
import { useParam } from 'src/hooks/useParam';
import { capitalize } from 'src/utils';
import { View } from 'react-native';
import { tw } from 'src/theme';

export const TaskListScreen = () => {
  const list = (useParam('list') as ListType) ?? ListType.inbox;
  return (
    <TaskListPresenterProvider>
      <View style={tw`h-full`}>
        <Stack.Screen options={{ title: capitalize(list) }} />
        <TaskList list={list} />
      </View>
    </TaskListPresenterProvider>
  );
};
