import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import colors from "src/theme/colors.json";

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

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

export const unstable_settings = {
  initialRouteName: "index",
};

export default function AppLayout() {
  const scheme = useColorScheme();
  const theme = scheme === "light" ? lightTheme : darkTheme;
  return (
    <ThemeProvider value={theme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
