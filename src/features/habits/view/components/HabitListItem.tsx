import { observer } from "mobx-react";
import { Text, View } from "react-native";
import { Checkbox } from "../../../../components/Checkbox";
import { HabitViewModel } from "../../presenters/habit-list-presenter";
import { ListItem, ListItemProps } from "../../../../components/ListItem";
import { tw } from "../../../../theme";

type HabitListItemProps = {
  item: HabitViewModel;
} & Pick<ListItemProps, "onPress">;

export const HabitListItem = observer(
  ({ item, onPress }: HabitListItemProps) => (
    <ListItem onPress={onPress}>
      <View style={tw`flex-row justify-between items-center`}>
        <Text style={tw`text-base-content`}>{item.title}</Text>
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
    </ListItem>
  )
);
