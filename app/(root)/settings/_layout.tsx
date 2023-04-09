import { Stack } from "expo-router";
import colors from "../../../src/theme/colors.json";

export default function SettingsLayout() {
  return (
    <Stack
      screenOptions={{
        headerLargeTitle: true,
        headerLargeTitleShadowVisible: false,
        headerStyle: { backgroundColor: colors["base-100"] },
      }}
    />
  );
}
