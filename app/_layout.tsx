import {
  ThemeProvider,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { colors } from "../src/theme/colors";
// import { tw } from "../src/theme/tailwind";

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
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  );
}
