import { Stack, useRouter } from "expo-router";
import { observer } from "mobx-react";
import { FlatList, ListRenderItem, Pressable, Text, View } from "react-native";
import { FloatingButton } from "../../../components/FloatingButton";
import { HabitViewModel } from "../habit-list-presenter";
import {
  useHabitListPresenter,
  HabitListPresenterProvider,
} from "./useHabitsListPresenter";
import { tw } from "../../../theme/tailwind";

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
        <View style={tw`flex-row btn bg-success`}>
          <Text>{item.title}</Text>
          <View>
            {item.isCompletedForSelectedDate ? (
              <Text style={tw`success`}>Completed</Text>
            ) : (
              <Text>Not completed</Text>
            )}
          </View>
        </View>
      </Pressable>
    );
  };

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
