import { useSearchParams } from 'expo-router';
import { Text, ScrollView } from 'react-native';

export const TaskDetailScreen = () => {
  const { taskId } = useSearchParams();
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Text className="text-base-content">Home page</Text>
      <Text className="text-base-content">{taskId}</Text>
    </ScrollView>
  );
};
