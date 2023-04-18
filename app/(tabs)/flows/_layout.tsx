import { Stack } from 'expo-router';
import { FeatureProvider } from 'src/hooks/useFeature';
import { tw } from 'src/theme';

export default function FlowsLayout() {
  return (
    <FeatureProvider value="flow">
      <Stack
        screenOptions={{
          headerShadowVisible: false,
          headerLargeTitle: true,
          headerLargeTitleShadowVisible: false,
          headerStyle: { backgroundColor: tw.color('base-100') },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Flows' }} />
      </Stack>
    </FeatureProvider>
  );
}
