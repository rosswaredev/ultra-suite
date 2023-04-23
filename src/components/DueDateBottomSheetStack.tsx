import {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { BottomSheet } from "./BottomSheet";
import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet";
import { Button } from "./Button";
import { Text } from "./Text";
import { DateBottomSheet } from "./DateBottomSheet";
import { Pressable, View } from "react-native";
import { Icon, IconName } from "./Icon";
import { tw } from "src/theme";
import { addDays } from "date-fns";

type MenuListItemProps = {
  icon: IconName;
  title: string;
  onPress: () => void;
};

const MenuListItem = ({ icon, title, onPress }: MenuListItemProps) => {
  return (
    <Pressable
      style={({ pressed }) =>
        tw.style(`flex-row items-center rounded-lg`, pressed && `bg-base-300`)
      }
      onPress={onPress}
    >
      <View style={tw`p-4`}>
        <Icon name={icon} size={24} color={tw.color("base-content")} />
      </View>
      <Text variant="bold">{title}</Text>
    </Pressable>
  );
};

export type DueDateBottomSheetStackHandle = {
  show: () => void;
};

export type DueDateBottomSheetStackProps = {
  onDate?: (date: Date) => void;
};

export const DueDateBottomSheetStack = forwardRef<
  DueDateBottomSheetStackHandle,
  DueDateBottomSheetStackProps
>(({ onDate }, ref) => {
  const { dismissAll } = useBottomSheetModal();
  const presetsModalRef = useRef<BottomSheetModal>();
  const dateModalRef = useRef<BottomSheetModal>();
  const snapPoints = useMemo(() => ["50%"], []);
  const [customDate, setCustomDate] = useState(new Date());

  useImperativeHandle(ref, () => ({
    show: () => presetsModalRef.current.present(),
  }));

  const handleTodayPress = () => {
    onDate(new Date());
    dismissAll();
  };
  const handleTomorrowPress = () => {
    onDate(addDays(new Date(), 1));
    dismissAll();
  };
  const handleCustomPress = () => {
    dateModalRef.current.present();
  };
  const handleCustomDateChange = (date: Date) => {
    setCustomDate(date);
  };

  return (
    <>
      <BottomSheet ref={presetsModalRef} snapPoints={snapPoints}>
        <View style={tw`p-4`}>
          <MenuListItem
            icon="calendar"
            title="Today"
            onPress={handleTodayPress}
          />
          <MenuListItem
            icon="calendar"
            title="Tomorrow"
            onPress={handleTomorrowPress}
          />
          <MenuListItem
            icon="calendar"
            title="Pick a Date"
            onPress={handleCustomPress}
          />
        </View>
      </BottomSheet>
      <DateBottomSheet
        ref={dateModalRef}
        date={customDate}
        onChange={handleCustomDateChange}
      />
    </>
  );
});
