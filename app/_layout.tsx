import {
  ThemeProvider,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import colors from "../src/theme/colors.json";

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
    primary: colors["primary-content"],
    border: colors["base-300"],
    notification: colors["primary-base"],
  },
};

export default function App() {
  const scheme = useColorScheme();

  const theme = scheme === "light" ? lightTheme : darkTheme;

  return (
    <ThemeProvider value={theme}>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
