import { View, FlatList, ListRenderItem } from 'react-native';
import { useTaskListPresenter } from './useTaskListPresenter';
import { useRouter } from 'expo-router';
import { FloatingButton } from '../../../components/FloatingButton';
import { observer } from 'mobx-react';
import { TaskListItem } from './TaskListItem';
import { Separator } from '../../../components/ListSeparator';

export type TaskViewModel = {
  id: string;
  title: string;
  completed: boolean;
};

export const TaskList = observer(() => {
  const router = useRouter();
  const taskListPresenter = useTaskListPresenter();

  const handleNewTask = () => router.push('/tasks/new');

  const renderItem: ListRenderItem<TaskViewModel> = ({ item }) => (
    <View className="px-4">
      <TaskListItem item={item} />
    </View>
  );

  return (
    <>
      <FlatList
        data={taskListPresenter.tasks}
        className="pt-4"
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentInsetAdjustmentBehavior="automatic"
        ItemSeparatorComponent={Separator}
      />
      <FloatingButton onPress={handleNewTask} />
    </>
  );
});
