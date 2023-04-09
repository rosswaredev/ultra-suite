import { Stack, useRouter, useSearchParams } from 'expo-router';
import { observer } from 'mobx-react';
import { useState } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  TouchableOpacityProps,
} from 'react-native';
import { useHabitDetailPresenter } from '../hooks/useHabitDetailPresenter';
import { HabitDetailHeader } from './HabitDetailHeader';

const useHabitId = () => {
  const { habitId } = useSearchParams();
  const id =
    typeof habitId !== 'string' && habitId[0]
      ? habitId[0]
      : (habitId as string);
  return id;
};

type DetailCardProps = {} & Pick<TouchableOpacityProps, 'children' | 'onPress'>;

const DetailCard = ({ children, onPress }: DetailCardProps) => (
  <TouchableOpacity
    className="bg-base-200 flex-1 py-5 rounded-xl"
    onPress={onPress}
  >
    {children}
  </TouchableOpacity>
);

export const HabitDetailScreen = observer(() => {
  const router = useRouter();
  const habitId = useHabitId();
  const habit = useHabitDetailPresenter(habitId);
  const [habitTitle, setHabitTitle] = useState(habit.title);

  const handleChangeTitle = (title: string) => setHabitTitle(title);
  const handleSubmitTitle = () => habit.updateTitle(habitTitle);
  const handleDelete = () => {
    habit.removeHabit();
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
        <View className="flex-row">
          <DetailCard>
            <Text className="text-lg text-primary-content text-center">
              {`${habit.targetCount} times`}
            </Text>
          </DetailCard>
          <View className="w-2" />
          <DetailCard>
            <Text className="text-lg text-primary-content text-center">
              {`every ${habit.targetPeriod} days`}
            </Text>
          </DetailCard>
        </View>
        <View className="h-2" />
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
