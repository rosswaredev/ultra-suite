import { View, Text, FlatList, ListRenderItem } from 'react-native';
import { useTaskListPresenter } from './useTaskListPresenter';
import { useRouter } from 'expo-router';
import { FloatingButton } from '../../../components/FloatingButton';
import { observer } from 'mobx-react';
import { Checkbox } from '../../../components/Checkbox';

type TaskViewModel = {
  id: string;
  title: string;
  completed: boolean;
};

const TaskListItem = ({ item }: { item: TaskViewModel }) => {
  return (
    <View className="bg-base-200 rounded-lg px-3 py-3 flex-row items-center">
      <Checkbox isChecked={item.completed} onToggle={() => null} />
      <Text className="text-base-content ml-3">{item.title}</Text>
    </View>
  );
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

const Separator = () => <View className="h-1" />;
