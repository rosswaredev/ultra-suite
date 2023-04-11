import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleSheet,
} from "react-native";
import { tw } from "../theme";

type TextVariants = "title" | "body";

const VARIANT_STYLES_MAP = {
  title: tw`text-2xl font-semibold`,
  body: tw`text-base`,
} as const;

export type TextProps = {
  variant?: TextVariants;
} & Pick<RNTextProps, "style" | "children">;

export const Text = ({ variant = "body", style, children }: TextProps) => {
  const textStyles = [
    tw`text-base-content`,
    VARIANT_STYLES_MAP[variant],
    StyleSheet.flatten(style),
  ];
  return <RNText style={textStyles}>{children}</RNText>;
};
