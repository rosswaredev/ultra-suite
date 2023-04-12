import { observer } from "mobx-react";
import { View } from "react-native";
import { Checkbox, ListItem, ListItemProps, Text } from "src/components";
import { Progress } from "src/components/Progress";
import { tw } from "src/theme";
import { HabitViewModel } from "../../presenters/habit-list-presenter";

type HabitListItemProps = {
  item: HabitViewModel;
} & Pick<ListItemProps, "onPress">;

export const HabitListItem = observer(
  ({ item, onPress }: HabitListItemProps) => (
    <ListItem onPress={onPress}>
      <View style={tw`flex-row items-center py-2`}>
        <Progress value={0.666} />
        <Text style={tw`flex-1 mx-3`}>{item.title}</Text>
        <Checkbox
          isChecked={item.isCompletedForSelectedDate}
          onToggle={item.toggleCompleted}
        />
      </View>
    </ListItem>
  )
);
