import { useRouter } from 'expo-router';
import { observer } from 'mobx-react';
import { View } from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import { FadeIn, FadeOut, Layout } from 'react-native-reanimated';
import { ListEmptyState } from 'src/components';
import { tw } from 'src/theme';
import { TaskViewModel } from '../../presenters/task-list-presenter';
import { useTaskListPresenter } from '../hooks/useTaskListPresenter';
import { TaskListItem } from './TaskListItem';

export const ListType = {
  inbox: 'inbox',
  today: 'today',
  upcoming: 'upcoming',
} as const;
export type ListType = keyof typeof ListType;

type TaskListProps = {
  list?: ListType;
};

export const TaskList = observer(({ list }: TaskListProps) => {
  const router = useRouter();
  const taskListPresenter = useTaskListPresenter();
  const tasks = taskListPresenter[list] ?? taskListPresenter.incompleteTasks;

  const handleNewTask = () => router.push('/tasks/new');
  const handlePressTask = (taskId: string) => () =>
    router.push(`/tasks/${taskId}`);

  const renderItem = ({
    item,
    drag,
    isActive,
  }: RenderItemParams<TaskViewModel>) => (
    <View style={tw.style(`px-4 py-px`)}>
      <ScaleDecorator>
        <TaskListItem
          item={item}
          onPress={handlePressTask(item.id)}
          onLongPress={drag}
        />
      </ScaleDecorator>
    </View>
  );

  return (
    <>
      {tasks.length > 0 ? (
        <DraggableFlatList
          data={tasks}
          containerStyle={tw`flex-1`}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentInsetAdjustmentBehavior="automatic"
          dragHitSlop={{ left: -50 }}
          onDragEnd={({ data }) => {
            const newOrder = data.map((item) => item.id);
            taskListPresenter.reorderTasks(newOrder);
          }}
          ListHeaderComponent={() => <View style={tw`h-4`} />}
          ListFooterComponent={() => <View style={tw`h-12`} />}
          itemEnteringAnimation={FadeIn}
          itemExitingAnimation={FadeOut}
          itemLayoutAnimation={Layout}
          enableLayoutAnimationExperimental
        />
      ) : (
        <ListEmptyState title="task" icon="check" onPress={handleNewTask} />
      )}
    </>
  );
});
