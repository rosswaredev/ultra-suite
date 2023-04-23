import { BottomSheetModal } from "@gorhom/bottom-sheet";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { forwardRef, useMemo } from "react";
import { useFeature } from "src/hooks/useFeature";
import { tw } from "src/theme";
import { BottomSheet } from "./BottomSheet";
import { Button } from "./Button";
import { View } from "react-native";
import { Text } from "./Text";

export type DateBottomSheetProps = {
  date: Date;
  onChange: (date: Date) => void;
};

export const DateBottomSheet = forwardRef<
  BottomSheetModal,
  DateBottomSheetProps
>(({ date = new Date(), onChange }, ref) => {
  const feature = useFeature();
  const snapPoints = useMemo(() => ["50%"], []);

  const handleChange = ({ nativeEvent }: DateTimePickerEvent) => {
    const today = new Date();
    const newDate = new Date(nativeEvent.timestamp);
    console.log(newDate, nativeEvent.timestamp);
    onChange(newDate);
  };

  return (
    <BottomSheet
      ref={ref}
      snapPoints={snapPoints}
      handleComponent={() => {
        return (
          <View style={tw`flex-row justify-between items-center`}>
            <Button variant="ghost" title="Back" />
            <Text variant="bold">Due Date</Text>
            <Button variant="ghost" title="Done" />
          </View>
        );
      }}
    >
      <DateTimePicker
        value={date}
        mode="date"
        display="inline"
        accentColor={tw.color(`${feature}-focus`)}
        onChange={handleChange}
      />
    </BottomSheet>
  );
});
