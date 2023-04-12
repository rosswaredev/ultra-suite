import { observer } from "mobx-react";
import { View } from "react-native";
import { Checkbox, ListItem, ListItemProps, Text } from "src/components";
import { tw } from "src/theme";
import { TaskViewModel } from "../../presenters/task-list-presenter";

export type TaskListItemProps = {
  item: TaskViewModel;
} & Pick<ListItemProps, "onPress">;

export const TaskListItem = observer(({ item, onPress }: TaskListItemProps) => {
  return (
    <ListItem onPress={onPress}>
      <View style={tw`flex-row items-center`}>
        <Checkbox isChecked={item.completed} onToggle={item.toggleCompletion} />
        <Text style={tw`text-base-content text-base ml-3`}>{item.title}</Text>
      </View>
    </ListItem>
  );
});
