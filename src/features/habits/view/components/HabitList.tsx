import { useRouter } from "expo-router";
import { observer } from "mobx-react";
import { FlatList, ListRenderItem, View } from "react-native";
import { AbsolutePosition, Button, ListEmptyState } from "src/components";
import { tw } from "src/theme";
import { HabitViewModel } from "../../presenters/habit-list-presenter";
import { useHabitListPresenter } from "../hooks/useHabitsListPresenter";
import { HabitListItem } from "./HabitListItem";

type HabitsListProps = {
  header?: React.ReactElement;
};

export const HabitsList = observer(({ header }: HabitsListProps) => {
  const router = useRouter();
  const habitListPresenter = useHabitListPresenter();

  const handleNewHabit = () => router.push("/habits/new");
  const handleHabitPress = (id: string) => () => router.push(`/habits/${id}`);

  const renderItem: ListRenderItem<HabitViewModel> = ({ item }) => (
    <View style={tw`px-4 py-px`}>
      <HabitListItem item={item} onPress={handleHabitPress(item.id)} />
    </View>
  );

  return (
    <>
      <FlatList
        data={habitListPresenter.habits}
        style={tw`pt-4`}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentInsetAdjustmentBehavior="automatic"
        ListHeaderComponent={header}
        ListEmptyComponent={
          <ListEmptyState
            title="habit"
            icon="trending-up"
            onPress={handleNewHabit}
          />
        }
      />
      {habitListPresenter.hasHabits && (
        <AbsolutePosition bottom={16} right={16}>
          <Button
            variant="primary"
            icon="plus"
            isRound
            onPress={handleNewHabit}
          />
        </AbsolutePosition>
      )}
    </>
  );
});
