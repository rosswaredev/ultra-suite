import { Stack } from "expo-router";
import { ScrollView, Text } from "react-native";

export default function HabitsHome() {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Stack.Screen options={{ title: "Habits" }} />
      <Text>Habits Home</Text>
    </ScrollView>
  );
}
