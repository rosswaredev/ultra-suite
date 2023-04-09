import { Stack, useSearchParams } from 'expo-router';
import { Text, ScrollView, View } from 'react-native';
import { Checkbox } from '../../../components/Checkbox';
import { useTaskDetailPresenter } from './useTaskDetailPresenter';
import { observer } from 'mobx-react';

type TaskDetailHeaderProps = {
  title: string;
  completed: boolean;
  onChangeTitle: (title: string) => void;
  onToggleCompletion: () => void;
};

const TaskDetailHeader = ({
  title,
  completed,
  onChangeTitle,
  onToggleCompletion,
}: TaskDetailHeaderProps) => {
  return (
    <View className="flex-row items-center px-5 py-3">
      <Checkbox size="lg" isChecked={completed} onToggle={onToggleCompletion} />
      <Text className="text-base-content text-3xl font-semibold ml-3">
        {title}
      </Text>
    </View>
  );
};
const useTaskId = () => {
  const { taskId } = useSearchParams();
  const id =
    typeof taskId !== 'string' && taskId[0] ? taskId[0] : (taskId as string);
  return id;
};

export const TaskDetailScreen = observer(() => {
  const taskId = useTaskId();
  const task = useTaskDetailPresenter(taskId);

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Stack.Screen options={{ headerLargeTitle: false, title: '' }} />
      <TaskDetailHeader
        title={task.title}
        completed={task.completed}
        onToggleCompletion={task.toggleCompletion}
        onChangeTitle={() => null}
      />
    </ScrollView>
  );
});
