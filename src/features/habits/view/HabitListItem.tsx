import { observer } from 'mobx-react';
import { Text, View } from 'react-native';
import { Checkbox } from '../../../components/Checkbox';
import { HabitViewModel } from '../habit-list-presenter';

type HabitListItemProps = {
  item: HabitViewModel;
};

export const HabitListItem = observer(({ item }: HabitListItemProps) => (
  <View className="bg-base-200 rounded-lg flex-row px-3 py-3 justify-between items-center">
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
));
