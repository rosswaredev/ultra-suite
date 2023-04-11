import { Pressable, PressableProps } from "react-native";
import { tw } from "../theme";
import { Text } from "./Text";

const COMMON_STYLES = `py-3 px-7 border`;
const BUTTON_VARIANT_STYLES = {
  primary: {
    base: tw`bg-primary-base/25 ${COMMON_STYLES} border-primary-base/50`,
    text: tw`text-primary-base text-center`,
  },
  default: {
    base: tw`bg-base-200 ${COMMON_STYLES} border-base-300`,
    text: tw`text-base-content text-center`,
  },
  error: {
    base: tw`bg-error-base/25 ${COMMON_STYLES} border-error-base/50`,
    text: tw`text-error-base text-center`,
  },
};
type ButtonVariants = keyof typeof BUTTON_VARIANT_STYLES;
type ButtonProps = {
  variant?: ButtonVariants;
  title: string;
  round?: boolean;
} & Pick<PressableProps, "onPress">;
export const Button = ({ variant, title, round, onPress }: ButtonProps) => {
  const { base, text } = BUTTON_VARIANT_STYLES[variant || "default"];
  return (
    <Pressable
      style={({ pressed }) => [
        base,
        tw.style(
          pressed && "opacity-70",
          round ? "rounded-full" : "rounded-lg"
        ),
      ]}
      onPress={onPress}
    >
      <Text variant="bold" style={text}>
        {title}
      </Text>
    </Pressable>
  );
};
