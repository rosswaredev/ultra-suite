import { Octicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { ComponentProps } from 'react';
import colors from '../../src/theme/colors.json';

const tabBarIcon =
  (name: ComponentProps<typeof Octicons>['name']) =>
  ({ size, color }) =>
    <Octicons name={name} size={size} color={color} />;

export default function Home() {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarInactiveTintColor: colors['base-400'],
        }}
      >
        <Tabs.Screen
          name="tasks"
          options={{
            title: 'Tasks',
            tabBarIcon: tabBarIcon('check'),
          }}
        />
        <Tabs.Screen
          name="habits"
          options={{
            title: 'Habits',
            tabBarIcon: tabBarIcon('graph'),
          }}
        />
        <Tabs.Screen
          name="flows/index"
          options={{ title: 'Flows', tabBarIcon: tabBarIcon('list-ordered') }}
        />
        <Tabs.Screen
          name="calendar/index"
          options={{ title: 'Calendar', tabBarIcon: tabBarIcon('calendar') }}
        />
        <Tabs.Screen
          name="settings"
          options={{ title: 'Settings', tabBarIcon: tabBarIcon('gear') }}
        />
      </Tabs>
    </>
  );
}
