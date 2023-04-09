import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

export type ListItemProps = {} & Pick<
  TouchableOpacityProps,
  'children' | 'onPress'
>;

export const ListItem = ({ children, onPress }: ListItemProps) => (
  <TouchableOpacity
    className="bg-base-200 rounded-lg px-3 py-3 border-base-300 border"
    onPress={onPress}
  >
    {children}
  </TouchableOpacity>
);
