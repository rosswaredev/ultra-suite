import { View, ViewProps } from "react-native";

export type AbsolutePositionProps = {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
} & Pick<ViewProps, "children">;
export const AbsolutePosition = ({
  top,
  bottom,
  left,
  right,
  children,
}: AbsolutePositionProps) => (
  <View style={{ position: "absolute", top, bottom, left, right }}>
    {children}
  </View>
);
