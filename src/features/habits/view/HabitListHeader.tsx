import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HabitListDateSelector } from "./HabitListDateSelector";
import { HabitListPresenterProvider } from "./useHabitsListPresenter";

export const HabitListHeader = () => {
  const { top } = useSafeAreaInsets();
  return (
    <HabitListPresenterProvider>
      <View style={{ marginTop: top }}>
        <Text className="text-base-content my-2 text-lg font-semibold text-center">
          Habits
        </Text>
        <HabitListDateSelector />
      </View>
    </HabitListPresenterProvider>
  );
};
