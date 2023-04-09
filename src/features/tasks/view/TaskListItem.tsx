import { observer } from 'mobx-react';
import { Text, View } from 'react-native';
import { Checkbox } from '../../../components/Checkbox';
import { ListItem } from '../../../components/ListItem';
import { TaskViewModel } from './TaskList';

export const TaskListItem = observer(({ item }: { item: TaskViewModel }) => {
  return (
    <ListItem>
      <View className="flex-row items-center">
        <Checkbox isChecked={item.completed} onToggle={() => null} />
        <Text className="text-base-content ml-3">{item.title}</Text>
      </View>
    </ListItem>
  );
});
