import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Text, TextInput } from 'src/components';
import { tw } from 'src/theme';
import { useHabitListPresenter } from '../hooks/useHabitsListPresenter';
import { HabitCriteriaRow } from './HabitCriteriaRow';

const NEW_HABIT_PLACEHOLDER = 'New habit';
export const NewHabitForm = () => {
  const router = useRouter();
  const habitListPresenter = useHabitListPresenter();
  const [title, setTitle] = useState('');
  const [targetCountInput, setTargetCountInput] = useState('1');
  const [targetPeriodInput, setTargetPeriodInput] = useState('1');

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
      style={tw`px-4`}
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
    >
      <Text variant="heading" style={tw`mb-1`}>
        Title
      </Text>
      <TextInput
        value={title}
        placeholder={NEW_HABIT_PLACEHOLDER}
        onChangeText={handleNewHabitTextChange}
        style={tw`mb-2`}
        onSubmitEditing={handleAddHabit}
      />
      <HabitCriteriaRow
        targetCount={targetCountInput}
        targetPeriod={targetPeriodInput}
        onTargetCountChange={handleTargetCountChange}
        onTargetPeriodChange={handleTargetPeriodChange}
      />
      <View style={tw`items-end`}>
        <Button
          variant="primary"
          icon="plus"
          title="Add Habit"
          onPress={handleAddHabit}
        />
      </View>
    </ScrollView>
  );
};
