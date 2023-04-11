import React from "react";
import { View } from "react-native";
import { NumberInput, Text } from "../../../../components";
import { tw } from "../../../../theme";

type HabitCriteraProps = {
  targetCount: string | number;
  targetPeriod: string | number;
  onTargetCountChange?: (text: string) => void;
  onTargetPeriodChange?: (text: string) => void;
};
export const HabitCriteriaRow = ({
  targetCount,
  targetPeriod,
  onTargetCountChange,
  onTargetPeriodChange,
}: HabitCriteraProps) => (
  <View style={tw`flex-row items-center mb-4`}>
    <NumberInput
      trailingText={Number(targetCount) === 1 ? "time" : "times"}
      value={`${targetCount}`}
      onChangeText={onTargetCountChange}
    />
    <Text style={tw`px-2`}>in</Text>
    <NumberInput
      trailingText={Number(targetPeriod) === 1 ? "day" : "days"}
      value={`${targetPeriod}`}
      onChangeText={onTargetPeriodChange}
    />
  </View>
);
