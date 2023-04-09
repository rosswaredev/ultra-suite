import { Stack, useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
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
  const inputRef = useRef<TextInput | null>(null);

  const handlePress = () => {
    inputRef.current.focus();
  };

  return (
    <TouchableOpacity
      className="bg-base-200 rounded-lg flex-row flex-1 items-center"
      onPress={handlePress}
    >
      <TextInput
        ref={inputRef}
        className="text-md text-base-content px-3 py-4"
        keyboardType="number-pad"
        value={value}
        onChangeText={onChangeText}
        onEndEditing={() => value === '' && onChangeText('1')}
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
  const [title, setTitle] = useState('');
  const [targetCountInput, setTargetCountInput] = useState('1');
  const [targetPeriodInput, setTargetPeriodInput] = useState('7');

  const targetCount = Number(targetCountInput);
  const targetPeriod = Number(targetPeriodInput);

  const handleNewHabitTextChange = (text: string) => setTitle(text);
  const handleTargetCountChange = (text: string) => setTargetCountInput(text);
  const handleTargetPeriodChange = (text: string) => setTargetPeriodInput(text);

  const handleAddHabit = () => {
    const trimmedTitle = title.trim();
    habitListPresenter.addHabit(
      trimmedTitle.length > 0 ? trimmedTitle : NEW_HABIT_PLACEHOLDER,
      targetCount,
      targetPeriod
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
          trailingText={targetCount === 1 ? 'time' : 'times'}
          value={`${targetCountInput}`}
          onChangeText={handleTargetCountChange}
        />
        <Text className="text-base-content text-m px-2">in</Text>
        <DetailedInput
          trailingText={targetPeriod === 1 ? 'day' : 'days'}
          value={`${targetPeriodInput}`}
          onChangeText={handleTargetPeriodChange}
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
