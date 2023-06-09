import React, { useRef, useState } from 'react';
import { Pressable, TextInputProps } from 'react-native';
import { Text } from './Text';
import { TextInput } from './TextInput';
import { tw } from 'src/theme';
import { useFeature } from 'src/hooks/useFeature';

export type NumberInput = {
  trailingText: string;
} & Pick<TextInputProps, 'value' | 'onChangeText'>;
export const NumberInput = ({
  trailingText,
  value,
  onChangeText,
}: NumberInput) => {
  const feature = useFeature();
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const handlePress = () => inputRef.current.focus();
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <Pressable
      style={tw.style(
        `bg-base-200 rounded-lg flex-row flex-1 items-center border border-base-200`,
        isFocused && `border-${feature ?? 'primary'}-base`
      )}
      onPress={handlePress}
    >
      <TextInput
        ref={inputRef}
        style={tw`flex-1 font-bold`}
        keyboardType="number-pad"
        value={value}
        onChangeText={onChangeText}
        onEndEditing={() => value === '' && onChangeText('1')}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <Text style={tw`px-3`}>{trailingText}</Text>
    </Pressable>
  );
};
