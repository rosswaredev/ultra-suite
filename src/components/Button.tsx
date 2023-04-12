import { Pressable, PressableProps, StyleSheet, ViewProps } from "react-native";
import { tw } from "src/theme";
import { haptics } from "src/utils/haptics";
import { Icon, IconName } from "./Icon";
import { Text } from "./Text";

const BUTTON_VARIANT_STYLES = {
  primary: {
    base: `bg-primary-base/25 border-primary-base/50`,
    text: `text-primary-base`,
  },
  default: {
    base: `bg-base-200 border-base-300`,
    text: `text-base-content`,
  },
  ghost: {
    base: `border-transparent`,
    text: `text-primary-base`,
  },
  error: {
    base: `bg-error-base/25 border-error-base/50`,
    text: `text-error-base`,
  },
};
type ButtonVariants = keyof typeof BUTTON_VARIANT_STYLES;

export type ButtonProps = {
  variant?: ButtonVariants;
  icon?: IconName;
  title?: string;
  round?: boolean;
} & Pick<PressableProps, "onPress"> &
  Pick<ViewProps, "style">;

export const Button = ({
  style,
  variant,
  icon,
  title,
  round,
  onPress,
}: ButtonProps) => {
  const { base, text } = BUTTON_VARIANT_STYLES[variant || "default"];
  const styles = StyleSheet.flatten(style);

  return (
    <Pressable
      style={({ pressed }) => [
        tw.style(
          base,
          `py-3 pr-7 border`,
          "flex-row items-center justify-center",
          icon ? "pl-6" : "pl-7",
          !title && "px-3",
          pressed && "opacity-70",
          round ? "rounded-full" : "rounded-lg"
        ),
        styles,
      ]}
      onPress={(event) => {
        if (onPress) haptics.medium();
        onPress?.(event);
      }}
    >
      {!!icon && <Icon name={icon} color={tw.color(text)} size={24} />}
      {!!title && (
        <Text variant="bold" style={tw.style(text, icon && "ml-3")}>
          {title}
        </Text>
      )}
    </Pressable>
  );
};
