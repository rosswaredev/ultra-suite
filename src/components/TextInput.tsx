import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import {
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from "react-native";
import { tw } from "../theme";

export type TextInputProps = {} & RNTextInputProps;

export const TextInput = forwardRef<RNTextInput, TextInputProps>(
  ({ style, onFocus, onBlur, ...rest }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const styles = StyleSheet.flatten(style);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    return (
      <RNTextInput
        ref={ref}
        style={[
          tw.style(
            `text-base-content text-base leading-tight bg-base-200 py-4 px-3 rounded-lg border border-base-200`,
            isFocused && "border-primary-base"
          ),
          styles,
        ]}
        onFocus={onFocus ?? handleFocus}
        onBlur={onBlur ?? handleBlur}
        {...rest}
      />
    );
  }
);
