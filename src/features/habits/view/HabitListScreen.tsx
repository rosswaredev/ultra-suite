import { Stack } from "expo-router";
import { HabitsList } from "./HabitList";
import { HabitListHeader } from "./HabitListHeader";
import { HabitListPresenterProvider } from "./useHabitsListPresenter";

export const HabitListScreen = () => {
  return (
    <HabitListPresenterProvider>
      <Stack.Screen
        options={{
          title: "Habits",
          header: () => <HabitListHeader />,
        }}
      />
      <HabitsList />
    </HabitListPresenterProvider>
  );
};
