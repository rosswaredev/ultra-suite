import { Tabs } from "expo-router";
import colors from "src/theme/colors.json";

import { Icon, IconName } from "src/components/Icon";

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const lightTheme: typeof DefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};

const darkTheme: typeof DefaultTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors["base-100"],
    card: colors["base-200"],
    text: colors["base-content"],
    primary: colors["primary-base"],
    border: colors["base-300"],
    notification: colors["primary-base"],
  },
};

const tabBarIcon =
  (name: IconName) =>
  ({ size, color }) => {
    return <Icon name={name} size={size - 2} color={color} />;
  };

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "tasks",
};

export default function AppLayout() {
  const scheme = useColorScheme();

  const theme = scheme === "light" ? lightTheme : darkTheme;
  return (
    <ThemeProvider value={theme}>
      <SafeAreaProvider>
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
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
