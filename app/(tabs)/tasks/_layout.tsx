import { Stack } from 'expo-router';
import { FeatureProvider } from 'src/hooks/useFeature';
import { tw } from 'src/theme';

export default function TasksLayout() {
  return (
    <FeatureProvider value="task">
      <Stack
        screenOptions={{
          headerShadowVisible: false,
          headerLargeTitle: true,
          headerLargeTitleShadowVisible: false,
          headerStyle: { backgroundColor: tw.color('base-100') },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Tasks' }} />
      </Stack>
    </FeatureProvider>
  );
}
