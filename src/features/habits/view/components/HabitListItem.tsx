import { observer } from 'mobx-react';
import { Text, View } from 'react-native';
import { Checkbox } from '../../../../components/Checkbox';
import { HabitViewModel } from '../../presenters/habit-list-presenter';
import { ListItem } from '../../../../components/ListItem';

type HabitListItemProps = {
  item: HabitViewModel;
};

export const HabitListItem = observer(({ item }: HabitListItemProps) => (
  <ListItem>
    <View className="flex-row justify-between items-center">
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
  </ListItem>
));
