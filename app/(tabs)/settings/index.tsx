import { Link, Stack } from "expo-router";
import { ScrollView } from "react-native";
import { Text } from "src/components";
import { tw } from "src/theme";

export default function SettingsHome() {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Stack.Screen options={{ title: "Settings" }} />
      <Text>{process.env.POCKETBASE_URL}</Text>
      <Text>Updooted</Text>
      <Link href="_sitemap" style={tw`text-primary-base`}>
        Sitemap
      </Link>
      <Link href="settings/notifications" style={tw`text-primary-base`}>
        Notifications
      </Link>
    </ScrollView>
  );
}
