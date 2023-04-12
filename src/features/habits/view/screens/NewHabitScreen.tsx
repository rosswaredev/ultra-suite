import { Stack } from "expo-router";
import React from "react";
import { HabitListPresenterProvider } from "../hooks/useHabitsListPresenter";
import { NewHabitForm } from "../components/NewHabitForm";

export const NewHabitScreen = () => {
  return (
    <HabitListPresenterProvider>
      <Stack.Screen options={{ title: "New Habit" }} />
      <NewHabitForm />
    </HabitListPresenterProvider>
  );
};
