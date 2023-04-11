import { default as cn } from "classnames";
import { TouchableOpacity, View } from "react-native";
import { slop } from "../utils";

import { Check } from "lucide-react-native";
import colors from "../theme/colors.json";
import { tw } from "../theme";

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
  <TouchableOpacity onPress={onToggle} hitSlop={slop.all(20)}>
    <View
      style={tw`${cn(
        "border-2 rounded-full justify-center items-center",
        size === "md" ? "w-6 h-6" : "w-8 h-8",
        isChecked ? "bg-primary-base" : "bg-base-200",
        isChecked ? "border-primary-base" : "border-primary-base/50"
      )}`}
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
