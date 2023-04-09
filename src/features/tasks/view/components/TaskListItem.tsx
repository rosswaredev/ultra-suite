import { observer } from 'mobx-react';
import { Text, View } from 'react-native';
import { Checkbox } from '../../../../components/Checkbox';
import { ListItem, ListItemProps } from '../../../../components/ListItem';
import { TaskViewModel } from '../../presenters/task-list-presenter';

export type TaskListItemProps = {
  item: TaskViewModel;
} & Pick<ListItemProps, 'onPress'>;

export const TaskListItem = observer(({ item, onPress }: TaskListItemProps) => {
  return (
    <ListItem onPress={onPress}>
      <View className="flex-row items-center">
        <Checkbox isChecked={item.completed} onToggle={item.toggleCompletion} />
        <Text className="text-base-content ml-3">{item.title}</Text>
      </View>
    </ListItem>
  );
});
