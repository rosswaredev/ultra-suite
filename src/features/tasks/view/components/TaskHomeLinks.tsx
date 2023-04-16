import { useRouter } from 'expo-router';
import { LinkProps } from 'expo-router/build/link/Link';
import { Pressable } from 'react-native';
import { Icon, IconName, Text } from 'src/components';
import { tw } from 'src/theme';
import { useTaskListPresenter } from '../hooks/useTaskListPresenter';

const LINKS: TaskHomeLink[] = [
  {
    list: 'inbox',
    icon: 'inbox',
    title: 'Inbox',
    href: 'tasks/list?list=inbox',
  },
  {
    list: 'completed',
    icon: 'sun',
    title: 'Today',
    href: 'tasks/list?list=today',
  },
  {
    list: 'upcoming',
    icon: 'calendar-plus',
    title: 'Upcoming',
    href: 'tasks/list?list=upcoming',
  },
  {
    list: 'completed',
    icon: 'check-circle',
    title: 'Completed',
    href: 'tasks/list?list=completed',
  },
];

export const TaskHomeLinks = () => {
  const taskListPresenter = useTaskListPresenter();
  return (
    <>
      {LINKS.map(({ icon, title, href, list }) => (
        <TaskHomeLink
          key={`${href}`}
          icon={icon}
          title={title}
          href={href}
          count={taskListPresenter[list].length}
        />
      ))}
    </>
  );
};

export type TaskHomeLink = {
  icon: IconName;
  title: string;
  href: LinkProps['href'];
  list: 'inbox' | 'today' | 'upcoming' | 'completed';
};
type TaskHomeLinkProps = {
  count?: number;
} & Omit<TaskHomeLink, 'list'>;
const TaskHomeLink = ({ icon, title, href, count }: TaskHomeLinkProps) => {
  const router = useRouter();
  const handlePress = () => router.push(href);

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
      {count && <Text variant="heading">{count}</Text>}
    </Pressable>
  );
};
