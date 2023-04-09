import { Stack, useRouter, useSearchParams } from 'expo-router';
import { observer } from 'mobx-react';
import { useState } from 'react';
import { ScrollView, TouchableOpacity, Text, View } from 'react-native';
import { useHabitDetailPresenter } from '../hooks/useHabitDetailPresenter';

const useHabitId = () => {
  const { habitId } = useSearchParams();
  const id =
    typeof habitId !== 'string' && habitId[0]
      ? habitId[0]
      : (habitId as string);
  return id;
};

export const HabitDetailScreen = observer(() => {
  const router = useRouter();
  const habitId = useHabitId();
  const habit = useHabitDetailPresenter(habitId);
  const [habitTitle, setHabitTitle] = useState(habit.title);

  const handleChangeTitle = (title: string) => setHabitTitle(title);
  const handleSubmitTitle = () => habit.updateTitle(habitTitle);
  const handleDelete = () => {
    router.back();
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Stack.Screen options={{ headerLargeTitle: false, title: '' }} />
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
