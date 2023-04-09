import { Stack, useRouter, useSearchParams } from 'expo-router';
import { observer } from 'mobx-react';
import { useState } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  TextInput,
} from 'react-native';
import { useHabitDetailPresenter } from '../hooks/useHabitDetailPresenter';

type HabitDetailHeaderProps = {
  title: string;
  onChangeTitle: (title: string) => void;
  onSubmitTitle: () => void;
};

const HabitDetailHeader = observer(
  ({ title, onChangeTitle, onSubmitTitle }: HabitDetailHeaderProps) => {
    return (
      <View className="flex-row justify-between items-center px-4 py-3">
        <TextInput
          className="text-2xl font-bold text-base-content"
          value={title}
          onChangeText={onChangeTitle}
          onEndEditing={onSubmitTitle}
        />
      </View>
    );
  }
);

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
        <HabitDetailHeader
          title={habitTitle}
          onChangeTitle={handleChangeTitle}
          onSubmitTitle={handleSubmitTitle}
        />
        <TouchableOpacity
          className="p-2 bg-error-base rounded-lg"
          onPress={handleDelete}
        >
          <Text className="text-lg text-error-content text-center">
            Delete Habit
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
});
