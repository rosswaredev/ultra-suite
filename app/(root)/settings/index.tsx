import { Stack } from "expo-router";
import { ScrollView, Text } from "react-native";

export default function SettingsHome() {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Stack.Screen options={{ title: "Settings" }} />
      <Text className="text-base-content">{process.env.POCKETBASE_URL}</Text>
    </ScrollView>
  );
}
