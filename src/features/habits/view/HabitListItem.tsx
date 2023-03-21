import { MaterialCommunityIcons } from "@expo/vector-icons";
import { observer } from "mobx-react";
import { Pressable, View, Text, TouchableOpacity } from "react-native";
import { colors } from "../../../theme/colors";
import { HabitViewModel } from "../habit-list-presenter";

type HabitListItemProps = {
  item: HabitViewModel;
};

export const HabitListItem = observer(({ item }: HabitListItemProps) => (
  <View className="bg-base-200 rounded-lg flex-row px-3 py-3 justify-between items-center">
    <Text className="text-base-content">{item.title}</Text>
    <Checkbox
      isChecked={item.isCompletedForSelectedDate}
      onToggle={item.toggleCompleted}
    />
  </View>
));

type CheckboxProps = {
  isChecked: boolean;
  onToggle: () => void;
};
const Checkbox = ({ isChecked, onToggle }: CheckboxProps) => (
  <TouchableOpacity
    style={{
      backgroundColor: colors[isChecked ? "primary-base" : "transparent"],
    }}
    className="h-6 w-6 border-primary-base border-2 rounded-full justify-center items-center"
    onPress={onToggle}
  >
    {isChecked ? (
      <MaterialCommunityIcons
        name="check"
        size={16}
        color={colors["base-content"]}
      />
    ) : null}
  </TouchableOpacity>
);
