import { useRouter } from "expo-router";
import { observer } from "mobx-react";
import { ListRenderItem, FlatList, View } from "react-native";
import { FloatingButton } from "../../../components/FloatingButton";
import { HabitViewModel } from "../habit-list-presenter";
import { HabitListItem } from "./HabitListItem";
import { useHabitListPresenter } from "./useHabitsListPresenter";

export const HabitsList = observer(() => {
  const router = useRouter();
  const habitListPresenter = useHabitListPresenter();

  const handleNewHabit = () => router.push("/habits/new");

  const renderItem: ListRenderItem<HabitViewModel> = ({ item }) => (
    <HabitListItem item={item} />
  );

  return (
    <>
      <FlatList
        data={habitListPresenter.habits}
        renderItem={renderItem}
        contentInsetAdjustmentBehavior="automatic"
        className="px-4"
        ItemSeparatorComponent={Separator}
      />
      <FloatingButton onPress={handleNewHabit} />
    </>
  );
});

const Separator = () => <View className="h-1" />;
