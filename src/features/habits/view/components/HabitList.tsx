import { useRouter } from "expo-router";
import { observer } from "mobx-react";
import { FlatList, ListRenderItem, View } from "react-native";
import { FloatingButton } from "../../../../components/FloatingButton";
import { HabitViewModel } from "../../presenters/habit-list-presenter";
import { HabitListItem } from "./HabitListItem";
import { useHabitListPresenter } from "../hooks/useHabitsListPresenter";
import { Separator } from "../../../../components/ListSeparator";
import { tw } from "../../../../theme";

type HabitsListProps = {
  header?: React.ReactElement;
};

export const HabitsList = observer(({ header }: HabitsListProps) => {
  const router = useRouter();
  const habitListPresenter = useHabitListPresenter();

  const handleNewHabit = () => router.push("/habits/new");
  const handleHabitPress = (id: string) => () => router.push(`/habits/${id}`);

  const renderItem: ListRenderItem<HabitViewModel> = ({ item }) => (
    <View style={tw`px-4`}>
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
        ItemSeparatorComponent={Separator}
      />
      <FloatingButton onPress={handleNewHabit} />
    </>
  );
});
