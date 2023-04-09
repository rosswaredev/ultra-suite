import { Stack, useSearchParams } from 'expo-router';
import { Text, ScrollView, View } from 'react-native';
import { Checkbox } from '../../../components/Checkbox';
import { useTaskDetailPresenter } from './useTaskDetailPresenter';

const useTaskId = () => {
  const { taskId } = useSearchParams();
  const id =
    typeof taskId !== 'string' && taskId[0] ? taskId[0] : (taskId as string);
  return id;
};

export const TaskDetailScreen = () => {
  const taskId = useTaskId();
  const task = useTaskDetailPresenter(taskId);

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Stack.Screen options={{ headerLargeTitle: false, title: '' }} />
      <View className="flex-row items-center">
        <Checkbox size="lg" isChecked={task.completed} onToggle={() => null} />
        <Text className="text-base-content text-3xl font-semibold">
          {task.title}
        </Text>
      </View>
    </ScrollView>
  );
};
