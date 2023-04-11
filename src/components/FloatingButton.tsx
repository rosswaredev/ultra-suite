import { Plus } from "lucide-react-native";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import { tw } from "../theme";

export const FloatingButton = ({ onPress }: TouchableOpacityProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw`bg-primary-base/25 rounded-full w-12 h-12 items-center justify-center border border-primary-base/50`}
    >
      <Plus size={24} color={tw.color("primary-base")} />
    </TouchableOpacity>
  );
};
