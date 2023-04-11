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
      // style={{
      //   position: "absolute",
      //   borderRadius: 999,
      //   width: 48,
      //   height: 48,
      //   right: 16,
      //   bottom: 16,
      //   alignItems: "center",
      //   justifyContent: "center",
      // }}
    >
      <Plus size={24} color={colors["primary-content"]} />
    </TouchableOpacity>
  );
};
