import { Stack } from "expo-router";
import { ScrollView, Text } from "react-native";
import { tw } from "../../../src/theme";

export default function SettingsHome() {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Stack.Screen options={{ title: "Settings" }} />
      <Text style={tw`text-base-content`}>{process.env.POCKETBASE_URL}</Text>
    </ScrollView>
  );
}
