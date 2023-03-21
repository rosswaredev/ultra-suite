import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { Button, ScrollView, Text, TextInput } from "react-native";
import {
  HabitListPresenterProvider,
  useHabitListPresenter,
} from "./useHabitsListPresenter";

export const NewHabitScreen = () => {
  return (
    <HabitListPresenterProvider>
      <Stack.Screen options={{ title: "New Habit" }} />
      <NewHabitForm />
    </HabitListPresenterProvider>
  );
};

const NewHabitForm = () => {
  const router = useRouter();
  const habitListPresenter = useHabitListPresenter();
  const [newHabitTitle, setNewHabitTitle] = useState("");

  const handleNewHabitTextChange = (text: string) => setNewHabitTitle(text);

  const handleAddHabit = () => {
    habitListPresenter.addHabit(newHabitTitle);
    router.back();
  };

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ paddingTop: 100 }}
    >
      <Text>Title</Text>
      <TextInput
        value={newHabitTitle}
        placeholder="New habit"
        onChangeText={handleNewHabitTextChange}
      />
      <Button title="Add Habit" onPress={handleAddHabit} />
    </ScrollView>
  );
};
