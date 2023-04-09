import { MaterialCommunityIcons } from '@expo/vector-icons';
import { default as cn } from 'classnames';
import { TouchableOpacity, View } from 'react-native';
import { slop } from '../utils/slop';

import colors from '../theme/colors.json';

export type CheckboxProps = {
  isChecked: boolean;
  onToggle: () => void;
};

export const Checkbox = ({ isChecked, onToggle }: CheckboxProps) => (
  <TouchableOpacity onPress={onToggle} hitSlop={slop.all(20)}>
    <View
      className={cn(
        isChecked ? 'bg-primary-base' : 'bg-base-200',
        'h-6 w-6 border-2 rounded-full justify-center items-center',
        isChecked ? 'border-primary-base' : 'border-primary-base/50'
      )}
    >
      {isChecked ? (
        <MaterialCommunityIcons
          name="check"
          size={16}
          color={colors['base-content']}
        />
      ) : null}
    </View>
  </TouchableOpacity>
);
