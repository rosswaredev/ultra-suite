import { Tabs } from "expo-router";
import colors from "../../src/theme/colors.json";

import {
  Calendar,
  Check,
  ListVideo,
  Settings,
  TrendingUp,
} from "lucide-react-native";

const TAB_BAR_ICON_MAP = {
  check: Check,
  "trending-up": TrendingUp,
  "list-video": ListVideo,
  calendar: Calendar,
  settings: Settings,
};
type IconName = keyof typeof TAB_BAR_ICON_MAP;

const tabBarIcon =
  (name: IconName) =>
  ({ size, color }) => {
    const Icon = TAB_BAR_ICON_MAP[name];
    return <Icon size={size - 2} color={color} />;
  };

export default function Home() {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarInactiveTintColor: colors["base-400"],
        }}
      >
        <Tabs.Screen
          name="tasks"
          options={{
            title: "Tasks",
            tabBarIcon: tabBarIcon("check"),
          }}
        />
        <Tabs.Screen
          name="habits"
          options={{
            title: "Habits",
            tabBarIcon: tabBarIcon("trending-up"),
          }}
        />
        <Tabs.Screen
          name="flows/index"
          options={{ title: "Flows", tabBarIcon: tabBarIcon("list-video") }}
        />
        <Tabs.Screen
          name="calendar/index"
          options={{ title: "Calendar", tabBarIcon: tabBarIcon("calendar") }}
        />
        <Tabs.Screen
          name="settings"
          options={{ title: "Settings", tabBarIcon: tabBarIcon("settings") }}
        />
      </Tabs>
    </>
  );
}
