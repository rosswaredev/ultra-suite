import { Stack } from "expo-router";
import { ScrollView, Text } from "react-native";

export default function TasksHome() {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Stack.Screen options={{ title: "Tasks" }} />
      <Text className="text-base-content">{process.env.POCKETBASE_URL}</Text>
    </ScrollView>
  );
}
