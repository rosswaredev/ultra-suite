import { Stack, useRouter } from "expo-router";
import { observer } from "mobx-react";
import { FlatList, ListRenderItem, Pressable, Text, View } from "react-native";
import { FloatingButton } from "../../../components/FloatingButton";
import { HabitViewModel } from "../habit-list-presenter";
import {
  useHabitListPresenter,
  HabitListPresenterProvider,
} from "./useHabitsListPresenter";

export const HabitListScreen = () => {
  return (
    <HabitListPresenterProvider>
      <Stack.Screen options={{ title: "Habits" }} />
      <HabitsList />
    </HabitListPresenterProvider>
  );
};

const HabitsList = observer(() => {
  const router = useRouter();
  const habitListPresenter = useHabitListPresenter();

  const handleNewHabit = () => router.push("/habits/new");

  const handleToggleHabitCompleted = (habitId: string) => {
    habitListPresenter.toggleCompletedForSelectedDate(habitId);
  };

  const renderItem: ListRenderItem<HabitViewModel> = ({ item }) => {
    console.log("item", item);
    return (
      <Pressable onPress={() => handleToggleHabitCompleted(item.id)}>
        <View style={{ flexDirection: "row" }}>
          <Text>{item.title}</Text>
          <View>
            {item.isCompletedForSelectedDate ? (
              <Text>Completed</Text>
            ) : (
              <Text>Not completed</Text>
            )}
          </View>
        </View>
      </Pressable>
    );
  };

  console.log("habits", habitListPresenter.habits);

  return (
    <>
      <FlatList
        data={habitListPresenter.habits}
        renderItem={renderItem}
        contentInsetAdjustmentBehavior="automatic"
      />
      <FloatingButton onPress={handleNewHabit} />
    </>
  );
});
