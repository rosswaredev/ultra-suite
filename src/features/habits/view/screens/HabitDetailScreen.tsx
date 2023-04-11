import { Stack, useRouter, useSearchParams } from "expo-router";
import { observer } from "mobx-react";
import { useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  TouchableOpacityProps,
} from "react-native";
import { Button } from "../../../../components/Button";
import { tw } from "../../../../theme";
import { useHabitDetailPresenter } from "../hooks/useHabitDetailPresenter";
import { HabitDetailHeader } from "./HabitDetailHeader";

const useHabitId = () => {
  const { habitId } = useSearchParams();
  const id =
    typeof habitId !== "string" && habitId && habitId[0]
      ? habitId[0]
      : (habitId as string);
  return id;
};

type DetailCardProps = {} & Pick<TouchableOpacityProps, "children" | "onPress">;

const DetailCard = ({ children, onPress }: DetailCardProps) => (
  <TouchableOpacity
    style={tw`bg-base-200 flex-1 py-5 rounded-xl`}
    onPress={onPress}
  >
    {children}
  </TouchableOpacity>
);

export const HabitDetailScreen = observer(() => {
  const router = useRouter();
  const habitId = useHabitId();
  const habit = useHabitDetailPresenter(habitId);
  const [habitTitle, setHabitTitle] = useState(habit.title);

  const handleChangeTitle = (title: string) => setHabitTitle(title);
  const handleSubmitTitle = () => habit.updateTitle(habitTitle);
  const handleDelete = () => {
    habit.removeHabit();
    router.back();
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Stack.Screen options={{ headerLargeTitle: false, title: "" }} />
      <View style={tw`px-3`}>
        <HabitDetailHeader
          title={habitTitle}
          onChangeTitle={handleChangeTitle}
          onSubmitTitle={handleSubmitTitle}
        />
        <View style={tw`flex-row`}>
          <DetailCard>
            <Text style={tw`text-lg text-primary-content text-center`}>
              {`${habit.targetCount} times`}
            </Text>
          </DetailCard>
          <View style={tw`w-2`} />
          <DetailCard>
            <Text style={tw`text-lg text-primary-content text-center`}>
              {`every ${habit.targetPeriod} days`}
            </Text>
          </DetailCard>
        </View>
        <View style={tw`h-2`} />
        <Button variant="error" title="Delete Habit" onPress={handleDelete} />
      </View>
    </ScrollView>
  );
});
