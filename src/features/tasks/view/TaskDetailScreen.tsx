import { Stack, useSearchParams } from 'expo-router';
import { observer } from 'mobx-react';
import { useState } from 'react';
import { ScrollView, TextInput, View } from 'react-native';
import { Checkbox } from '../../../components/Checkbox';
import { useTaskDetailPresenter } from './useTaskDetailPresenter';

type TaskDetailHeaderProps = {
  title: string;
  completed: boolean;
  onChangeTitle: (title: string) => void;
  onToggleCompletion: () => void;
  onSubmitTitle: () => void;
};

const TaskDetailHeader = ({
  title,
  completed,
  onChangeTitle,
  onToggleCompletion,
  onSubmitTitle,
}: TaskDetailHeaderProps) => {
  return (
    <View className="flex-row items-center px-5 py-3">
      <Checkbox size="lg" isChecked={completed} onToggle={onToggleCompletion} />
      <TextInput
        className="text-base-content text-3xl font-semibold ml-3"
        value={title}
        onChangeText={onChangeTitle}
        onEndEditing={onSubmitTitle}
      />
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
  const [taskTitle, setTaskTitle] = useState(task.title);

  const handleChangeTitle = (title: string) => setTaskTitle(title);
  const handleSubmitTitle = () => task.updateTitle(taskTitle);

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Stack.Screen options={{ headerLargeTitle: false, title: '' }} />
      <TaskDetailHeader
        title={taskTitle}
        completed={task.completed}
        onToggleCompletion={task.toggleCompletion}
        onChangeTitle={handleChangeTitle}
        onSubmitTitle={handleSubmitTitle}
      />
    </ScrollView>
  );
});
