import { Tabs } from "expo-router";
import { Icon, IconName } from "src/components/Icon";
import colors from "src/theme/colors.json";

const tabBarIcon =
  (name: IconName) =>
  ({ size, color }) => {
    return <Icon name={name} size={size - 2} color={color} />;
  };

export default function AppLayout() {
  return (
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
  );
}
