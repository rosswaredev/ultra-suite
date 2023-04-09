import { Stack, useSearchParams } from 'expo-router';
import { observer } from 'mobx-react';
import { useState } from 'react';
import { ScrollView } from 'react-native';
import { useTaskDetailPresenter } from './useTaskDetailPresenter';
import { TaskDetailHeader } from './TaskDetailHeader';

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
