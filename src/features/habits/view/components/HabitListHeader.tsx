import { format, isToday } from 'date-fns';
import { observer } from 'mobx-react-lite';
import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HabitListDateSelector } from './HabitListDateSelector';
import {
  HabitListPresenterProvider,
  useHabitListPresenter,
} from '../hooks/useHabitsListPresenter';

export const HabitListHeader = () => {
  const { top } = useSafeAreaInsets();

  return (
    <HabitListPresenterProvider>
      <View style={{ marginTop: top }}>
        <HabitListHeaderTitle />
        <HabitListDateSelector />
        <View className="bg-base-300" style={{ height: 0.5 }} />
      </View>
    </HabitListPresenterProvider>
  );
};

const HabitListHeaderTitle = observer(() => {
  const habitListPresenter = useHabitListPresenter();

  const title = isToday(new Date(habitListPresenter.selectedDate))
    ? 'Today'
    : format(new Date(habitListPresenter.selectedDate), 'MMM d');

  return (
    <View className="flex-row items-center justify-center">
      <Text className="text-base-content text-lg font-semibold my-2">
        {title}
      </Text>
    </View>
  );
});
