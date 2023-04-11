import { observer } from "mobx-react";
import { View } from "react-native";
import {
  Checkbox,
  ListItem,
  ListItemProps,
  Text,
} from "../../../../components";
import { tw } from "../../../../theme";
import { HabitViewModel } from "../../presenters/habit-list-presenter";

type HabitListItemProps = {
  item: HabitViewModel;
} & Pick<ListItemProps, "onPress">;

export const HabitListItem = observer(
  ({ item, onPress }: HabitListItemProps) => (
    <ListItem onPress={onPress}>
      <View style={tw`flex-row justify-between items-center`}>
        <Text>{item.title}</Text>
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
