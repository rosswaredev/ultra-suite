import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Button,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
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

const NEW_HABIT_PLACEHOLDER = "New habit";

const NewHabitForm = () => {
  const router = useRouter();
  const habitListPresenter = useHabitListPresenter();
  const [newHabitTitle, setNewHabitTitle] = useState("");

  const handleNewHabitTextChange = (text: string) => setNewHabitTitle(text);

  const handleAddHabit = () => {
    const trimmedTitle = newHabitTitle.trim();
    habitListPresenter.addHabit(
      trimmedTitle.length > 0 ? trimmedTitle : NEW_HABIT_PLACEHOLDER
    );
    router.back();
  };

  return (
    <ScrollView className="px-4" contentInsetAdjustmentBehavior="automatic">
      <Text className="text-base-content text-lg font-semibold mb-1">
        Title
      </Text>
      <TextInput
        value={newHabitTitle}
        placeholder={NEW_HABIT_PLACEHOLDER}
        onChangeText={handleNewHabitTextChange}
        className="text-base-content text-md bg-base-200 py-4 px-3 rounded-lg mb-2"
      />
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
