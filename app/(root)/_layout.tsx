import { Stack, Tabs } from 'expo-router';

export default function Home() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="tasks" options={{ title: 'Tasks' }} />
      <Tabs.Screen name="habits/index" options={{ title: 'Habits' }} />
      <Tabs.Screen name="flows/index" options={{ title: 'Flows' }} />
      <Tabs.Screen name="calendar/index" options={{ title: 'Calendar' }} />
    </Tabs>
  );
}
