import { Stack } from 'expo-router';
import colors from 'src/theme/colors.json';

export default function TasksLayout() {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerLargeTitle: true,
        headerLargeTitleShadowVisible: false,
        headerStyle: { backgroundColor: colors['base-100'] },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Lists' }} />
    </Stack>
  );
}
