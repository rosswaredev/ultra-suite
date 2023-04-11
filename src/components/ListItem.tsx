import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { tw } from "../theme";

export type ListItemProps = {} & Pick<
  TouchableOpacityProps,
  "children" | "onPress"
>;

export const ListItem = ({ children, onPress }: ListItemProps) => (
  <TouchableOpacity
    style={tw`bg-base-200 rounded-lg px-3 py-3 border-base-300 border`}
    onPress={onPress}
  >
    {children}
  </TouchableOpacity>
);
