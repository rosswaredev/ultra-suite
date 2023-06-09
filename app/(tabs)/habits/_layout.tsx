import { Stack } from 'expo-router';
import { FeatureProvider } from 'src/hooks/useFeature';
import { tw } from 'src/theme';
import colors from 'src/theme/colors.json';

export default function HabitsLayout() {
  return (
    <FeatureProvider value="habit">
      <Stack
        screenOptions={{
          headerLargeTitle: true,
          headerLargeTitleShadowVisible: false,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: colors['base-100'] },
          headerTintColor: tw.color(`habit-base`),
        }}
      />
    </FeatureProvider>
  );
}
