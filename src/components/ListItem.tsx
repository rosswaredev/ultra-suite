import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { tw } from 'src/theme';
import { haptics } from 'src/utils';

export type ListItemProps = {} & Pick<
  TouchableOpacityProps,
  'children' | 'onPress' | 'onLongPress'
>;

export const ListItem = ({ children, onPress, onLongPress }: ListItemProps) => (
  <TouchableOpacity
    style={tw`bg-base-200 rounded-lg px-3 py-1 border-base-200 border`}
    onPress={(event) => {
      if (onPress) haptics.medium();
      onPress?.(event);
    }}
    onLongPress={onLongPress}
  >
    {children}
  </TouchableOpacity>
);
