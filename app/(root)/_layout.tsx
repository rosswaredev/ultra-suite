import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function Home() {
  return (
    <Tabs
      screenOptions={{ headerShown: false, tabBarStyle: { paddingBottom: 3 } }}
    >
      <Tabs.Screen
        name="tasks"
        options={{
          title: "Tasks",
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="check" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="habits/index"
        options={{
          title: "Habits",
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="playlist-check"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="flows/index"
        options={{
          title: "Flows",
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="playlist-play"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar/index"
        options={{
          title: "Calendar",
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="calendar-today"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
