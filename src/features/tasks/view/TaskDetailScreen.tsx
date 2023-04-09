import { Stack, useRouter, useSearchParams } from 'expo-router';
import { observer } from 'mobx-react';
import { useState } from 'react';
import { ScrollView, TouchableOpacity, Text, View } from 'react-native';
import { useTaskDetailPresenter } from './useTaskDetailPresenter';
import { TaskDetailHeader } from './TaskDetailHeader';

const useTaskId = () => {
  const { taskId } = useSearchParams();
  const id =
    typeof taskId !== 'string' && taskId[0] ? taskId[0] : (taskId as string);
  return id;
};

export const TaskDetailScreen = observer(() => {
  const router = useRouter();
  const taskId = useTaskId();
  const task = useTaskDetailPresenter(taskId);
  const [taskTitle, setTaskTitle] = useState(task.title);

  const handleChangeTitle = (title: string) => setTaskTitle(title);
  const handleSubmitTitle = () => task.updateTitle(taskTitle);
  const handleDelete = () => {
    task.removeTask();
    router.back();
  };

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
      <View className="px-3">
        <TouchableOpacity
          className="p-2 bg-error-base rounded-lg"
          onPress={handleDelete}
        >
          <Text className="text-lg text-error-content text-center">
            Delete Task
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
});
