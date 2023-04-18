import { useRouter } from 'expo-router';
import { LinkProps } from 'expo-router/build/link/Link';
import { Pressable } from 'react-native';
import { Icon, IconName, Separator, Text } from 'src/components';
import { tw } from 'src/theme';
import { useTaskListPresenter } from '../hooks/useTaskListPresenter';
import { observer } from 'mobx-react';
import { Fragment } from 'react';

const LINKS: TaskHomeLink[] = [
  {
    list: 'inbox',
    icon: 'inbox',
    title: 'Inbox',
    href: 'tasks/list?list=inbox',
  },
  {
    list: 'today',
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

export const TaskHomeLinks = observer(() => {
  const taskListPresenter = useTaskListPresenter();
  return (
    <>
      {LINKS.map(({ icon, title, href, list }) => (
        <Fragment key={`${href}`}>
          <TaskHomeLink
            icon={icon}
            title={title}
            href={href}
            count={taskListPresenter[list].length}
            separator
          />
        </Fragment>
      ))}
    </>
  );
});

export type TaskHomeLink = {
  icon: IconName;
  title: string;
  href: LinkProps['href'];
  list: 'inbox' | 'today' | 'upcoming' | 'completed';
};
type TaskHomeLinkProps = {
  count?: number;
  separator?: boolean;
} & Omit<TaskHomeLink, 'list'>;
const TaskHomeLink = ({
  icon,
  title,
  href,
  count,
  separator,
}: TaskHomeLinkProps) => {
  const router = useRouter();
  const handlePress = () => router.push(href);

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) =>
        tw.style(`flex-row items-center px-5 py-3`, pressed && `bg-base-200`)
      }
    >
      <Icon name={icon} size={16} color={tw.color('base-content')} />
      <Text variant="bold" style={tw`ml-4 flex-1`}>
        {title}
      </Text>
      {!!count && <Text variant="bold">{count}</Text>}
      {separator && (
        <Separator
          style={tw`absolute bottom-0 left-5 right-5 h-px bg-base-200`}
        />
      )}
    </Pressable>
  );
};
