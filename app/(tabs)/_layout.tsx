import { Tabs } from 'expo-router';
import { Icon, IconName } from 'src/components/Icon';
import { tw } from 'src/theme';
import colors from 'src/theme/colors.json';
import { Text } from 'src/components';

const tabBarIcon =
  (name: IconName, color: string) =>
  ({ size, focused }) => {
    return (
      <Icon
        name={name}
        size={size - 2}
        color={focused ? color : colors['base-400']}
        thick={focused}
      />
    );
  };

const tabBarLabel =
  (color: string) =>
  ({ focused, children }) => {
    return (
      <Text
        variant="tiny"
        style={{
          color: focused ? color : tw.color('base-400'),
        }}
      >
        {children}
      </Text>
    );
  };

export default function AppLayout() {
  return (
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
          tabBarIcon: tabBarIcon('check', tw.color('task-base')),
          tabBarLabel: tabBarLabel(tw.color('task-base')),
        }}
      />
      <Tabs.Screen
        name="habits"
        options={{
          title: 'Habits',
          tabBarIcon: tabBarIcon('trending-up', tw.color('habit-base')),
          tabBarLabel: tabBarLabel(tw.color('habit-base')),
        }}
      />
      <Tabs.Screen
        name="flows"
        options={{
          title: 'Flows',
          tabBarIcon: tabBarIcon('list-video', tw.color('flow-base')),
          tabBarLabel: tabBarLabel(tw.color('flow-base')),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendar',
          tabBarIcon: tabBarIcon('calendar', tw.color('calendar-base')),
          tabBarLabel: tabBarLabel(tw.color('calendar-base')),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: tabBarIcon('settings', tw.color('primary-base')),
          tabBarLabel: tabBarLabel(tw.color('primary-base')),
        }}
      />
    </Tabs>
  );
}
