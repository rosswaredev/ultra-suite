import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { tw } from "src/theme";
import { haptics } from "src/utils";

export type ListItemProps = {} & Pick<
  TouchableOpacityProps,
  "children" | "onPress"
>;

export const ListItem = ({ children, onPress }: ListItemProps) => (
  <TouchableOpacity
    style={tw`bg-base-200 rounded-lg px-3 py-2 border-base-300 border`}
    onPress={(event) => {
      if (onPress) haptics.medium();
      onPress?.(event);
    }}
  >
    {children}
  </TouchableOpacity>
);
