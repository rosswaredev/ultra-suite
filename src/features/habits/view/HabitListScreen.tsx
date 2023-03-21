import { Stack } from "expo-router";
import { HabitsList } from "./HabitList";
import { HabitListPresenterProvider } from "./useHabitsListPresenter";

export const HabitListScreen = () => {
  return (
    <HabitListPresenterProvider>
      <Stack.Screen options={{ title: "Habits" }} />
      <HabitsList />
    </HabitListPresenterProvider>
  );
};
