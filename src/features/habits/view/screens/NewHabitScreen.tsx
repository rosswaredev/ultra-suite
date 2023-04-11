import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { Button, NumberInput, Text, TextInput } from "../../../../components";
import { tw } from "../../../../theme";
import {
  HabitListPresenterProvider,
  useHabitListPresenter,
} from "../hooks/useHabitsListPresenter";

export const NewHabitScreen = () => {
  return (
    <HabitListPresenterProvider>
      <Stack.Screen options={{ title: "New Habit" }} />
      <NewHabitForm />
    </HabitListPresenterProvider>
  );
};

const NEW_HABIT_PLACEHOLDER = "New habit";

const NewHabitForm = () => {
  const router = useRouter();
  const habitListPresenter = useHabitListPresenter();
  const [title, setTitle] = useState("");
  const [targetCountInput, setTargetCountInput] = useState("1");
  const [targetPeriodInput, setTargetPeriodInput] = useState("7");

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
      <View style={tw`flex-row items-center mb-4`}>
        <NumberInput
          trailingText={targetCount === 1 ? "time" : "times"}
          value={`${targetCountInput}`}
          onChangeText={handleTargetCountChange}
        />
        <Text style={tw`px-2`}>in</Text>
        <NumberInput
          trailingText={targetPeriod === 1 ? "day" : "days"}
          value={`${targetPeriodInput}`}
          onChangeText={handleTargetPeriodChange}
        />
      </View>
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
