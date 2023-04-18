import { View } from 'react-native';
import { tw } from 'src/theme';

type SeparatorProps = {
  style?: View['props']['style'];
};

export const Separator = ({ style }: SeparatorProps) => (
  <View style={[tw`h-px bg-base-200`, style]} />
);
