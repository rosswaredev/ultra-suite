import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { ComponentProps } from "react";
import { View } from "react-native";

const tabBarIcon =
  (name: ComponentProps<typeof MaterialCommunityIcons>["name"]) =>
  ({ size, color }) =>
    <MaterialCommunityIcons name={name} size={size} color={color} />;

const FloatingButton = () => {
  return (
    <View
      style={{
        position: "absolute",
        backgroundColor: "black",
        borderRadius: 999,
        width: 48,
        height: 48,
        right: 16,
        bottom: 16 + 48,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <MaterialCommunityIcons name="plus" size={24} color="white" />
    </View>
  );
};

export default function Home() {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { paddingBottom: 3 },
        }}
      >
        <Tabs.Screen
          name="tasks"
          options={{ title: "Tasks", tabBarIcon: tabBarIcon("check") }}
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
      <FloatingButton />
    </>
  );
}
