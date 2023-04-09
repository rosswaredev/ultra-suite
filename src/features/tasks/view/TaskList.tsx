import { View, Text, FlatList, ListRenderItem } from 'react-native';
import { useTaskListPresenter } from './useTaskListPresenter';
import { useRouter } from 'expo-router';
import { FloatingButton } from '../../../components/FloatingButton';

type TaskViewModel = {
  id: string;
  title: string;
  completed: boolean;
};

const TaskListItem = ({ item }: { item: TaskViewModel }) => {
  return (
    <View className="flex-row items-center justify-between">
      <Text>{item.title}</Text>
      <Text>{item.completed ? 'Completed' : 'Not completed'}</Text>
    </View>
  );
};

export const TaskList = () => {
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
};

const Separator = () => <View className="h-1" />;
