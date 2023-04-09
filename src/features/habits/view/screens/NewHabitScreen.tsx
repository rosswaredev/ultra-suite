import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  HabitListPresenterProvider,
  useHabitListPresenter,
} from '../hooks/useHabitsListPresenter';

type DetailedInputProps = {
  trailingText: string;
} & Pick<TextInputProps, 'value' | 'onChangeText'>;

const DetailedInput = ({
  trailingText,
  value,
  onChangeText,
}: DetailedInputProps) => {
  return (
    <TouchableOpacity className="bg-base-200 rounded-lg flex-row flex-1 items-center">
      <TextInput
        className="text-md text-base-content px-3 py-4"
        value={value}
        onChangeText={onChangeText}
      />
      <Text className="text-md text-base-content">{trailingText}</Text>
    </TouchableOpacity>
  );
};

export const NewHabitScreen = () => {
  return (
    <HabitListPresenterProvider>
      <Stack.Screen options={{ title: 'New Habit' }} />
      <NewHabitForm />
    </HabitListPresenterProvider>
  );
};

const NEW_HABIT_PLACEHOLDER = 'New habit';

const NewHabitForm = () => {
  const router = useRouter();
  const habitListPresenter = useHabitListPresenter();
  const [title, settitle] = useState('');
  const [targetCompletionCount, setTargetCompletionCount] = useState(1);
  const [targetCompletionPeriod, setTargetCompletionPeriod] = useState(7);

  const handleNewHabitTextChange = (text: string) => settitle(text);
  const handleTargetCompletionCountChange = (text: string) =>
    setTargetCompletionCount(Number(text));
  const handleTargetCompletionPeriodChange = (text: string) =>
    setTargetCompletionPeriod(Number(text));

  const handleAddHabit = () => {
    const trimmedTitle = title.trim();
    habitListPresenter.addHabit(
      trimmedTitle.length > 0 ? trimmedTitle : NEW_HABIT_PLACEHOLDER,
      targetCompletionCount,
      targetCompletionPeriod
    );
    router.back();
  };

  return (
    <ScrollView
      className="px-4"
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
    >
      <Text className="text-base-content text-lg font-semibold mb-1">
        Title
      </Text>
      <TextInput
        value={title}
        placeholder={NEW_HABIT_PLACEHOLDER}
        onChangeText={handleNewHabitTextChange}
        className="text-base-content text-md bg-base-200 py-4 px-3 rounded-lg mb-2"
        autoFocus
        onSubmitEditing={handleAddHabit}
      />
      <View className="flex-row items-center mb-4">
        <DetailedInput
          trailingText={targetCompletionCount === 1 ? 'time' : 'times'}
          value={`${targetCompletionCount}`}
          onChangeText={handleTargetCompletionCountChange}
        />
        <Text className="text-base-content text-m px-2">in</Text>
        <DetailedInput
          trailingText="days"
          value={`${targetCompletionPeriod}`}
          onChangeText={handleTargetCompletionPeriodChange}
        />
      </View>
      <View className="items-end">
        <Pressable
          style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
          onPress={handleAddHabit}
        >
          <View className="bg-primary-base/25 px-4 py-2 rounded-full">
            <Text className="text-primary-base text-lg">Add Habit</Text>
          </View>
        </Pressable>
      </View>
    </ScrollView>
  );
};
