import { View } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { tw } from 'src/theme';
import { Icon } from './Icon';
import { Text } from './Text';
import { useFeature } from 'src/hooks/useFeature';

type ProgressProps = {
  value: number;
  isFeatureColor?: boolean;
};

export const Progress = ({ value }: ProgressProps) => {
  const feature = useFeature();
  const clampedValue = Math.max(0, Math.min(1, value));
  const roundedValue = Math.round(clampedValue * 100);
  const color = `${feature ?? 'primary'}-base`;
  const baseColor = `bg-${color}`;
  const textColor = `text-${color}`;
  return (
    <View style={tw`w-6 h-6 justify-center items-center`}>
      <Svg style={tw`absolute left-0 top-0 w-6 h-6`} viewBox="0 0 10 10">
        <Path
          d="M 5 1 A 1 1 0 1 1 5 9 A 1 1 0 1 1 5 1"
          stroke={tw.color(`${baseColor}/25`)}
          strokeWidth="2"
        />
        <Path
          d="M 5 1 A 1 1 0 1 1 5 9 A 1 1 0 1 1 5 1"
          stroke={tw.color(color)}
          strokeWidth="2"
          strokeDasharray={'25'}
          strokeDashoffset={25 - Math.max(clampedValue, Number.EPSILON) * 25}
          strokeLinecap="round"
          fill={tw.color(roundedValue === 100 ? baseColor : 'transparent')}
        />
      </Svg>
      {roundedValue > 0 && roundedValue < 100 && (
        <Text style={[tw`${textColor} text-xs text-center`, { fontSize: 8 }]}>
          {Math.round(value * 100)}
        </Text>
      )}
      {roundedValue === 100 && (
        <Icon name="award" size={14} color={tw.color('base-200')} />
      )}
    </View>
  );
};
