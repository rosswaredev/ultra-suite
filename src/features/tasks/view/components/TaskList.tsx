import { useRouter } from 'expo-router';
import { observer } from 'mobx-react';
import { FlatList, ListRenderItem, View } from 'react-native';
import {
  AbsolutePosition,
  Button,
  ListEmptyState,
  Separator,
} from 'src/components';
import { tw } from 'src/theme';
import { TaskViewModel } from '../../presenters/task-list-presenter';
import { useTaskListPresenter } from '../hooks/useTaskListPresenter';
import { TaskListItem } from './TaskListItem';

export type ListType = 'inbox' | 'today' | 'upcoming';

type TaskListProps = {
  list?: ListType;
};

export const TaskList = observer(({ list }: TaskListProps) => {
  const router = useRouter();
  const taskListPresenter = useTaskListPresenter();
  const tasks = taskListPresenter[list] ?? taskListPresenter.tasks;

  const handleNewTask = () => router.push('/tasks/new');
  const handlePressTask = (taskId: string) => () =>
    router.push(`/tasks/${taskId}`);

  const renderItem: ListRenderItem<TaskViewModel> = ({ item }) => (
    <View style={tw`px-4`}>
      <TaskListItem item={item} onPress={handlePressTask(item.id)} />
    </View>
  );

  return (
    <>
      <FlatList
        data={tasks}
        style={tw`pt-4 flex-1 h-full`}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentInsetAdjustmentBehavior="automatic"
        ItemSeparatorComponent={Separator}
        ListEmptyComponent={
          <ListEmptyState title="task" icon="check" onPress={handleNewTask} />
        }
      />
      {taskListPresenter.hasTasks && (
        <AbsolutePosition bottom={16} right={16}>
          <Button variant="primary" icon="plus" round onPress={handleNewTask} />
        </AbsolutePosition>
      )}
    </>
  );
});
