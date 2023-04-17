import { TouchableOpacity, View } from "react-native";
import { haptics, slop } from "src/utils";

import { Check } from "lucide-react-native";
import colors from "src/theme/colors.json";
import { tw } from "src/theme";

export type CheckboxProps = {
  isChecked: boolean;
  onToggle: () => void;
  size?: "md" | "lg";
};

export const Checkbox = ({
  isChecked,
  onToggle,
  size = "md",
}: CheckboxProps) => (
  <TouchableOpacity
    onPress={() => {
      isChecked ? haptics.medium() : haptics.success();
      onToggle();
    }}
    hitSlop={slop.all(20)}
  >
    <View
      style={tw.style(
        "border-2 rounded-full justify-center items-center",
        size === "md" ? "w-6 h-6" : "w-8 h-8",
        isChecked ? "bg-primary-base" : "bg-base-200",
        isChecked ? "border-primary-base" : "border-primary-base/50"
      )}
    >
      {isChecked ? (
        <Check
          name="check"
          size={size === "md" ? 16 : 20}
          color={colors["primary-content"]}
        />
      ) : null}
    </View>
  </TouchableOpacity>
);
