import { format, isSameDay, sub } from "date-fns";
import {
  View,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  ViewToken,
} from "react-native";
import { useHabitListPresenter } from "../hooks/useHabitsListPresenter";
import { observer } from "mobx-react-lite";
import { useCallback } from "react";
import { haptics, slop } from "src/utils";
import { tw } from "src/theme";
import { Text } from "src/components";

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

  const handleViewableItemsChanged = useCallback(
    ({ changed }: { changed: ViewToken[] }) => {
      const hasAnItemBecomeHidden = changed.some((token) => !token.isViewable);
      if (hasAnItemBecomeHidden) haptics.light();
    },
    []
  );

  const renderItem: ListRenderItem<DateSelectorItem> = ({ item }) => {
    const isToday = isSameDay(item.date, new Date());
    return (
      <TouchableOpacity
        style={tw.style(
          "bg-base-200 w-11 py-2 rounded-lg border",
          item.isSelected ? "border-primary-base" : "border border-transparent"
        )}
        onPress={() => {
          haptics.heavy();
          habitListPresenter.selectDate(item.date);
        }}
        hitSlop={slop.all(5)}
      >
        <Text
          variant="small"
          style={tw.style(
            "font-bold text-center",
            isToday && "text-primary-base"
          )}
        >
          {format(item.date, "d")}
        </Text>
        <Text
          variant="small"
          style={tw.style("text-center", isToday && "text-primary-base")}
        >
          {format(item.date, "EEE").toUpperCase()}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      style={tw`mb-4`}
      data={days}
      renderItem={renderItem}
      keyExtractor={(item) => item.date.toISOString()}
      ListHeaderComponent={() => <View style={tw`w-4`} />}
      ItemSeparatorComponent={() => <View style={tw`w-1`} />}
      onViewableItemsChanged={handleViewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 0.4,
        waitForInteraction: true,
      }}
      horizontal
      inverted
      showsHorizontalScrollIndicator={false}
    />
  );
});
