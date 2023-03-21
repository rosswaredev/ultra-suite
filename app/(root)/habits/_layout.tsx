import { Stack } from "expo-router";
import { colors } from "../../../src/theme/colors";

export default function HabitsLayout() {
  return (
    <Stack
      screenOptions={{
        headerLargeTitle: true,
        headerStyle: { backgroundColor: colors["base-100"] },
      }}
    />
  );
}
