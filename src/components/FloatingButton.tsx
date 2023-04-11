import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Plus } from "lucide-react-native";

import colors from "../theme/colors.json";
import { tw } from "../theme";

export const FloatingButton = ({ onPress }: TouchableOpacityProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw`bg-primary-base rounded-full w-12 h-12 items-center justify-center`}
    >
      <Plus size={24} color={colors["primary-content"]} />
    </TouchableOpacity>
  );
};
