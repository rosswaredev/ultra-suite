import { Pressable, PressableProps } from 'react-native';
import { tw } from 'src/theme';
import { Icon, IconName } from './Icon';
import { Text } from './Text';

type ListEmptyStateProps = {
  title: string;
  icon: IconName;
} & Pick<PressableProps, 'onPress'>;
export const ListEmptyState = ({
  title,
  icon,
  onPress,
}: ListEmptyStateProps) => (
  <Pressable
    style={({ pressed }) =>
      tw.style(`justify-center items-center flex-1`, pressed && `opacity-75`)
    }
    onPress={onPress}
  >
    <Icon name={icon} size={64} color={tw.color('base-300')} />
    <Text
      style={tw`mb-4 text-base-300`}
    >{`No ${title.toLowerCase()}s yet. Why not create one?`}</Text>
  </Pressable>
);
