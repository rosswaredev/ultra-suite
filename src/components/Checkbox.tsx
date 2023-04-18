import { Check } from 'lucide-react-native';
import { TouchableOpacity, View } from 'react-native';
import { useFeature } from 'src/hooks/useFeature';
import { tw } from 'src/theme';
import colors from 'src/theme/colors.json';
import { haptics, slop } from 'src/utils';

export type CheckboxProps = {
  isChecked: boolean;
  onToggle: () => void;
  size?: 'md' | 'lg';
};

export const Checkbox = ({
  isChecked,
  onToggle,
  size = 'md',
}: CheckboxProps) => {
  const feature = useFeature();
  return (
    <TouchableOpacity
      onPress={() => {
        isChecked ? haptics.medium() : haptics.success();
        onToggle();
      }}
      hitSlop={slop.all(20)}
    >
      <View
        style={tw.style(
          'border-2 rounded-full justify-center items-center',
          size === 'md' ? 'w-6 h-6' : 'w-8 h-8',
          isChecked ? `bg-${feature}-base` : 'bg-base-200',
          isChecked ? `border-${feature}-base` : `border-${feature}-base/50`
        )}
      >
        {isChecked ? (
          <Check
            name="check"
            size={size === 'md' ? 16 : 20}
            color={tw.color('base-200')}
          />
        ) : null}
      </View>
    </TouchableOpacity>
  );
};
