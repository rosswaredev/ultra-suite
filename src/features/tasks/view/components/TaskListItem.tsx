import { observer } from 'mobx-react';
import { Text, View } from 'react-native';
import { Checkbox } from '../../../../components/Checkbox';
import { ListItem } from '../../../../components/ListItem';
import { TaskViewModel } from '../../task-list-presenter';

export type TaskListItemProps = {
  item: TaskViewModel;
};

export const TaskListItem = observer(({ item }: TaskListItemProps) => {
  return (
    <ListItem>
      <View className="flex-row items-center">
        <Checkbox isChecked={item.completed} onToggle={item.toggleCompletion} />
        <Text className="text-base-content ml-3">{item.title}</Text>
      </View>
    </ListItem>
  );
});
