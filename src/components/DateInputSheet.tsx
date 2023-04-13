import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useEffect, useRef } from "react";
import { View } from "react-native";
import { tw } from "src/theme";

type DateInputSheetProps = {
  value: Date;
  isOpen: boolean;
  onChange: (date: Date) => void;
};
export const DateInputSheet = ({
  value = new Date(),
  isOpen,
  onChange,
}: DateInputSheetProps) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    if (isOpen) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isOpen]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={[340]}
      backgroundStyle={tw`bg-base-200`}
      enablePanDownToClose={true}
      handleIndicatorStyle={tw`bg-base-500`}
    >
      <BottomSheetView>
        <View style={tw`flex-1 rounded-lg`}>
          <DateTimePicker
            value={value ?? new Date()}
            mode="date"
            display="inline"
            accentColor={tw.color("primary-base")}
            onChange={(_event: DateTimePickerEvent, newDate) => {
              onChange(newDate);
            }}
          />
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};
