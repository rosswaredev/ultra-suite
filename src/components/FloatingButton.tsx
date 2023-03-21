import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

export const FloatingButton = ({ onPress }: TouchableOpacityProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        position: "absolute",
        backgroundColor: "black",
        borderRadius: 999,
        width: 48,
        height: 48,
        right: 16,
        bottom: 16,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <MaterialCommunityIcons name="plus" size={24} color="white" />
    </TouchableOpacity>
  );
};
