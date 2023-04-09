import { View, FlatList, ListRenderItem, TouchableOpacity } from 'react-native';
import { useTaskListPresenter } from '../hooks/useTaskListPresenter';
import { useRouter } from 'expo-router';
import { FloatingButton } from '../../../../components/FloatingButton';
import { observer } from 'mobx-react';
import { TaskListItem } from './TaskListItem';
import { Separator } from '../../../../components/ListSeparator';
import { TaskViewModel } from '../../presenters/task-list-presenter';

export const TaskList = observer(() => {
  const router = useRouter();
  const taskListPresenter = useTaskListPresenter();

  const handleNewTask = () => router.push('/tasks/new');

  const handlePressTask = (taskId: string) => () =>
    router.push(`/tasks/${taskId}`);

  const renderItem: ListRenderItem<TaskViewModel> = ({ item }) => (
    <TouchableOpacity className="px-4" onPress={handlePressTask(item.id)}>
      <TaskListItem item={item} />
    </TouchableOpacity>
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
