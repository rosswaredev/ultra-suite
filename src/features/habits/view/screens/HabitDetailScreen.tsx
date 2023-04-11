import { Stack, useRouter, useSearchParams } from "expo-router";
import { observer } from "mobx-react";
import React, { useState } from "react";
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
import { HabitCriteriaRow } from "./HabitCriteriaRow";
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
  const [targetCountInput, setTargetCountInput] = useState(
    `${habit.targetCount}`
  );
  const [targetPeriodInput, setTargetPeriodInput] = useState(
    `${habit.targetPeriod}`
  );

  const handleChangeTitle = (title: string) => setHabitTitle(title);
  const handleSubmitTitle = () => habit.updateTitle(habitTitle);
  const handleDelete = () => {
    habit.removeHabit();
    router.back();
  };
  const handleUpdateTargetCount = (text: string) => {
    setTargetCountInput(text);
    const targetCount = Number(text);
    if (targetCount > 0) habit.updateTargetCount(targetCount);
  };
  const handleUpdateTargetPeriod = (text: string) => {
    setTargetPeriodInput(text);
    const targetPeriod = Number(text);
    if (targetPeriod > 0) habit.updateTargetPeriod(targetPeriod);
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
        <HabitCriteriaRow
          targetCount={targetCountInput}
          targetPeriod={targetPeriodInput}
          onTargetCountChange={handleUpdateTargetCount}
          onTargetPeriodChange={handleUpdateTargetPeriod}
        />
        <View style={tw`h-2`} />
        <Button variant="error" title="Delete Habit" onPress={handleDelete} />
      </View>
    </ScrollView>
  );
});
