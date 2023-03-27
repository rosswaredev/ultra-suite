import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { observer } from "mobx-react";
import { Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../../theme/colors";
import { slop } from "../../../utils/slop";
import { HabitViewModel } from "../habit-list-presenter";
import { default as cn } from "classnames";

type HabitListItemProps = {
  item: HabitViewModel;
};

export const HabitListItem = observer(({ item }: HabitListItemProps) => (
  <View className="bg-base-200 rounded-lg flex-row px-3 py-3 justify-between items-center">
    <Text className="text-base-content">{item.title}</Text>
    <Checkbox
      isChecked={item.isCompletedForSelectedDate}
      onToggle={() => {
        // item.isCompletedForSelectedDate
        //   ? Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        //   : Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        item.toggleCompleted();
      }}
    />
  </View>
));

type CheckboxProps = {
  isChecked: boolean;
  onToggle: () => void;
};
const Checkbox = ({ isChecked, onToggle }: CheckboxProps) => (
  <TouchableOpacity onPress={onToggle} hitSlop={slop.all(20)}>
    <View
      className={cn(
        isChecked ? "bg-primary-base" : "bg-base-200",
        "h-6 w-6 border-2 rounded-full justify-center items-center",
        isChecked ? "border-primary-base" : "border-primary-base/50"
      )}
    >
      {isChecked ? (
        <MaterialCommunityIcons
          name="check"
          size={16}
          color={colors["base-content"]}
        />
      ) : null}
    </View>
  </TouchableOpacity>
);
