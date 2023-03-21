import { format, isSameDay, sub } from "date-fns";
import {
  View,
  Text,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  ViewToken,
} from "react-native";
import { default as cn } from "classnames";
import { useHabitListPresenter } from "./useHabitsListPresenter";
import { observer } from "mobx-react-lite";
import * as Haptics from "expo-haptics";

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

  const handleViewableItemsChanged = ({
    changed,
  }: {
    changed: ViewToken[];
  }) => {
    const hasItemBecomeVisible = changed.some((token) => token.isViewable);
    if (hasItemBecomeVisible)
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const renderItem: ListRenderItem<DateSelectorItem> = ({ item }) => {
    const isToday = isSameDay(item.date, new Date());
    return (
      <TouchableOpacity
        className={cn(
          "w-11 py-2 rounded-lg border-2",
          item.isSelected ? "border-accent-base" : "border-base-200",
          item.isSelected && isToday ? "bg-accent-base" : "bg-base-200"
        )}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          habitListPresenter.selectDate(item.date);
        }}
      >
        <Text
          className={cn("text-base-content font-bold text-center", {
            "text-base-100": item.isSelected && isToday,
            "text-accent-base": !item.isSelected && isToday,
          })}
        >
          {format(item.date, "d")}
        </Text>
        <Text
          className={cn("text-base-content text-center", {
            "text-base-100": item.isSelected && isToday,
            "text-accent-base": !item.isSelected && isToday,
          })}
        >
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
      keyExtractor={(item) => item.date.toISOString()}
      ListHeaderComponent={() => <View className="w-4" />}
      ItemSeparatorComponent={() => <View className="w-1" />}
      onViewableItemsChanged={handleViewableItemsChanged}
      horizontal
      inverted
      showsHorizontalScrollIndicator={false}
    />
  );
});
