import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleSheet,
} from "react-native";
import { tw } from "src/theme";

const VARIANT_STYLES_MAP = {
  title: tw`text-base-content text-2xl font-semibold`,
  heading: tw`text-base-content text-lg font-semibold`,
  bold: tw`text-base-content text-base font-semibold`,
  body: tw`text-base-content text-base`,
  small: tw`text-base-content text-sm`,
} as const;
type TextVariants = keyof typeof VARIANT_STYLES_MAP;

export type TextProps = {
  variant?: TextVariants;
} & Pick<RNTextProps, "style" | "children">;

export const Text = ({ variant = "body", style, children }: TextProps) => {
  const textStyles = [VARIANT_STYLES_MAP[variant], StyleSheet.flatten(style)];
  return <RNText style={textStyles}>{children}</RNText>;
};
