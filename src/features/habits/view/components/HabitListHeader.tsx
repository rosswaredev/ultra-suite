import { format, isToday } from "date-fns";
import { observer } from "mobx-react-lite";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HabitListDateSelector } from "./HabitListDateSelector";
import {
  HabitListPresenterProvider,
  useHabitListPresenter,
} from "../hooks/useHabitsListPresenter";
import { tw } from "../../../../theme";
import { Text } from "../../../../components";

export const HabitListHeader = () => {
  const { top } = useSafeAreaInsets();

  return (
    <HabitListPresenterProvider>
      <View style={{ marginTop: top }}>
        <HabitListHeaderTitle />
        <HabitListDateSelector />
        <View style={tw`bg-base-300 h-px`} />
      </View>
    </HabitListPresenterProvider>
  );
};

const HabitListHeaderTitle = observer(() => {
  const habitListPresenter = useHabitListPresenter();

  const title = isToday(new Date(habitListPresenter.selectedDate))
    ? "Today"
    : format(new Date(habitListPresenter.selectedDate), "MMM d");

  return (
    <View style={tw`flex-row items-center justify-center`}>
      <Text variant="heading" style={tw`my-2`}>
        {title}
      </Text>
    </View>
  );
});
