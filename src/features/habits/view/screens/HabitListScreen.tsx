import { Stack } from 'expo-router';
import { HabitsList } from '../components/HabitList';
import { HabitListHeader } from '../components/HabitListHeader';
import { HabitListPresenterProvider } from '../hooks/useHabitsListPresenter';

export const HabitListScreen = () => {
  return (
    <HabitListPresenterProvider>
      <Stack.Screen options={{ header: () => <HabitListHeader /> }} />
      <HabitsList />
    </HabitListPresenterProvider>
  );
};
