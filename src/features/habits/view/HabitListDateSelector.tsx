import { format, isSameDay, sub } from "date-fns";
import {
  View,
  Text,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
} from "react-native";
import { default as cn } from "classnames";
import { useHabitListPresenter } from "./useHabitsListPresenter";
import { observer } from "mobx-react-lite";

const LAST_30_DAYS = [...Array(30).keys()].map((i) =>
  sub(new Date(), { days: i })
);

type DateSelectorItem = {
  date: Date;
  isSelected: boolean;
};

export const HabitListDateSelector = observer(() => {
  const habitListPresenter = useHabitListPresenter();

  const days = LAST_30_DAYS.map((item) => ({
    date: item,
    isSelected: isSameDay(item, new Date(habitListPresenter.selectedDate)),
  }));

  const renderItem: ListRenderItem<DateSelectorItem> = ({ item }) => {
    return (
      <TouchableOpacity
        className={cn(
          "p-2 rounded-lg border-2",
          item.isSelected ? "border-primary-base" : "border-base-100"
        )}
        onPress={() => habitListPresenter.selectDate(item.date)}
      >
        <Text className="text-base-content font-bold text-center">
          {format(item.date, "d")}
        </Text>
        <Text className="text-base-content">
          {format(item.date, "EEE").toUpperCase()}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      className="mb-2"
      data={days}
      renderItem={renderItem}
      ListHeaderComponent={() => <View className="w-4" />}
      horizontal
      inverted
      showsHorizontalScrollIndicator={false}
    />
  );
});
