import { Stack } from "expo-router";

export default function HabitsLayout() {
  return (
    <Stack
      screenOptions={{
        headerLargeTitle: true,
        headerStyle: { backgroundColor: "transparent" },
      }}
    />
  );
}
