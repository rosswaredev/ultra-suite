import { Pressable, PressableProps, StyleSheet, ViewProps } from "react-native";
import { tw } from "src/theme";
import { haptics } from "src/utils/haptics";
import { Icon, IconName } from "./Icon";
import { Text } from "./Text";
import { useFeature } from "src/hooks/useFeature";

const BUTTON_VARIANT_STYLES = {
  primary: {
    base: `bg-primary-base/25`,
    text: `text-primary-base`,
  },
  default: {
    base: `bg-base-200 border border-base-200`,
    text: `text-base-content`,
  },
  ghost: {
    base: `border border-transparent`,
    text: `text-primary-base`,
  },
  error: {
    base: `border bg-error-base/25`,
    text: `text-error-base`,
  },
};
type ButtonVariant = keyof typeof BUTTON_VARIANT_STYLES;

export type ButtonProps = {
  variant?: ButtonVariant;
  icon?: IconName;
  iconColor?: string;
  title?: string;
  isRound?: boolean;
  textStyle?: ViewProps["style"];
  onPress?: () => void;
} & Pick<ViewProps, "style">;

export const Button = ({
  style,
  textStyle,
  variant,
  icon,
  iconColor,
  title,
  isRound,
  onPress,
}: ButtonProps) => {
  const feature = useFeature();
  const { base, text } = BUTTON_VARIANT_STYLES[variant || "default"];
  const styles = StyleSheet.flatten(style);
  const textStyles = StyleSheet.flatten(textStyle);
  const defaultIconColor = feature ? `${feature}-base` : text;

  return (
    <Pressable
      style={({ pressed }) => [
        tw.style(
          base,
          `py-3 pr-7`,
          "flex-row items-center justify-center",
          icon ? "pl-6" : "pl-7",
          !title && "px-3",
          pressed && "opacity-70",
          isRound ? "rounded-full" : "rounded-lg",
          feature && variant !== "ghost" && `bg-${feature}-base/25`
        ),
        styles,
      ]}
      onPress={(event) => {
        if (onPress) haptics.medium();
        onPress?.(event);
      }}
    >
      {!!icon && (
        <Icon
          name={icon}
          color={tw.color(iconColor ?? defaultIconColor)}
          size={24}
        />
      )}
      {!!title && (
        <Text
          variant="bold"
          style={[
            tw.style(text, icon && "ml-3", feature && `text-${feature}-base`),
            textStyles,
          ]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
};
