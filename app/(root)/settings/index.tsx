import { Stack } from "expo-router";
import { ScrollView } from "react-native";
import { Text } from "../../../src/components";

export default function SettingsHome() {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Stack.Screen options={{ title: "Settings" }} />
      <Text>{process.env.POCKETBASE_URL}</Text>
    </ScrollView>
  );
}
