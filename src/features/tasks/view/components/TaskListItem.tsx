import { observer } from 'mobx-react';
import { View } from 'react-native';
import { Checkbox, Icon, ListItem, ListItemProps, Text } from 'src/components';
import { tw } from 'src/theme';
import { TaskViewModel } from '../../presenters/task-list-presenter';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';

export type TaskListItemProps = {
  item: TaskViewModel;
} & Pick<ListItemProps, 'onPress' | 'onLongPress'>;

export const TaskListItem = observer(
  ({ item, onPress, onLongPress }: TaskListItemProps) => {
    // Maintain local completion state to allow a window for the user to
    // cancel the completion toggle
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [isCompleted, setIsCompleted] = useState(item.completed);

    const handlePress = () => {
      setIsCompleted(!isCompleted);
    };

    useEffect(() => {
      if (isFirstRender) return setIsFirstRender(false);
      if (isCompleted === item.completed) return;

      const timeout = setTimeout(item.toggleCompletion, 1500);

      return () => clearTimeout(timeout);
    }, [isCompleted]);

    return (
      <ListItem onPress={onPress} onLongPress={onLongPress}>
        <View
          style={tw.style(`flex-row items-center`, !item.dueDate && `py-2`)}
        >
          <Checkbox isChecked={isCompleted} onToggle={handlePress} />
          <View style={tw`ml-3`}>
            <Text
              style={tw.style(
                item.completed && `text-base-500`,
                item.completed && `line-through`
              )}
            >
              {item.title}
            </Text>
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
