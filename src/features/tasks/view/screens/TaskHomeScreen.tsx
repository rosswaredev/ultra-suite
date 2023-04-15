import { Link, useRouter } from 'expo-router';
import { LinkProps } from 'expo-router/build/link/Link';
import { Pressable, PressableProps, ScrollView, View } from 'react-native';
import { Icon, IconName, Text } from 'src/components';
import { tw } from 'src/theme';

type TaskHomeLink = {
  icon: IconName;
  title: string;
  href: LinkProps['href'];
};

type TaskHomeLinkProps = TaskHomeLink;

const TaskHomeLink = ({ icon, title, href }: TaskHomeLinkProps) => {
  const router = useRouter();
  const handlePress = () => {
    router.push(href);
    console.log('push', href);
  };
  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) =>
        tw.style(`flex-row items-center px-6 py-3`, pressed && `opacity-75`)
      }
    >
      <Icon name={icon} size={24} color={tw.color('base-content')} />
      <Text variant="heading" style={tw`ml-4 flex-1`}>
        {title}
      </Text>
      <Icon name="chevron-right" size={24} color={tw.color('base-content')} />
    </Pressable>
  );
};

const LINKS: TaskHomeLink[] = [
  { icon: 'inbox', title: 'Inbox', href: 'tasks/list?list=inbox' },
  {
    icon: 'sun',
    title: 'Today',
    href: 'tasks/list?list=today',
  },
  {
    icon: 'calendar-plus',
    title: 'Upcoming',
    href: 'tasks/list?list=upcoming',
  },
];

export const TaskHomeScreen = () => {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" style={tw`py-4`}>
      {LINKS.map(({ icon, title, href }) => (
        <TaskHomeLink key={`${href}`} icon={icon} title={title} href={href} />
      ))}
    </ScrollView>
  );
};
