import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { ComponentProps } from "react";
import { colors } from "../../src/theme/colors";

const tabBarIcon =
  (name: ComponentProps<typeof MaterialCommunityIcons>["name"]) =>
  ({ size, color }) =>
    <MaterialCommunityIcons name={name} size={size} color={color} />;

export default function Home() {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { paddingBottom: 3 },
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
            tabBarIcon: tabBarIcon("playlist-check"),
          }}
        />
        <Tabs.Screen
          name="flows/index"
          options={{ title: "Flows", tabBarIcon: tabBarIcon("playlist-play") }}
        />
        <Tabs.Screen
          name="calendar/index"
          options={{ title: "Calendar", tabBarIcon: tabBarIcon("calendar") }}
        />
      </Tabs>
    </>
  );
}
