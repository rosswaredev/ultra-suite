import { observer } from 'mobx-react';
import { View } from 'react-native';
import { Checkbox, Icon, ListItem, ListItemProps, Text } from 'src/components';
import { tw } from 'src/theme';
import { TaskViewModel } from '../../presenters/task-list-presenter';
import { format } from 'date-fns';

export type TaskListItemProps = {
  item: TaskViewModel;
} & Pick<ListItemProps, 'onPress' | 'onLongPress'>;

export const TaskListItem = observer(
  ({ item, onPress, onLongPress }: TaskListItemProps) => {
    return (
      <ListItem onPress={onPress} onLongPress={onLongPress}>
        <View
          style={tw.style(`flex-row items-center`, !item.dueDate && `py-2`)}
        >
          <Checkbox
            isChecked={item.completed}
            onToggle={item.toggleCompletion}
          />
          <View style={tw`ml-3`}>
            <Text>{item.title}</Text>
            {item.dueDate && (
              <View style={tw`flex-row items-center`}>
                <Icon name="calendar" color={tw.color(`base-500`)} size={12} />
                <Text variant="tiny" style={tw`text-base-500 ml-1`}>
                  {format(item.dueDate, 'd/M')}
                </Text>
              </View>
            )}
          </View>
        </View>
      </ListItem>
    );
  }
);
