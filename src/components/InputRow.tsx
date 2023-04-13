import { View, Pressable, PressableProps } from "react-native";
import { tw } from "src/theme";
import { Icon, IconName } from "./Icon";
import { Text } from "./Text";

export type InputRowProps = {
  title: string;
  icon: IconName;
  isSelected?: boolean;
  onClear?: Pick<PressableProps, "onPress">["onPress"];
} & Pick<PressableProps, "onPress">;

export const InputRow = ({
  title,
  icon,
  isSelected,
  onPress,
  onClear,
}: InputRowProps) => (
  <View style={tw`flex-row items-center p-7`}>
    <Pressable
      style={({ pressed }) =>
        tw.style(`flex-1 flex-row`, pressed && "opacity-70")
      }
      onPress={onPress}
    >
      <Icon
        name={icon}
        size={24}
        color={tw.color(isSelected ? "primary-base" : "base-content")}
      />
      <Text
        style={tw.style(
          "flex-1 ml-7",
          isSelected ? "text-primary-base" : "text-base-content"
        )}
      >
        {title}
      </Text>
    </Pressable>
    {isSelected && (
      <Pressable onPress={onClear}>
        <Icon name="x" size={24} color={tw.color("base-300")} />
      </Pressable>
    )}
  </View>
);
