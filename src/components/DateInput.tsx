import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { format, isSameMonth, isSameYear } from "date-fns";
import React, { useRef, useState } from "react";
import { View } from "react-native";
import { tw } from "src/theme";
import { Button } from "./Button";

type DateInputProps = {
  title: string;
  value: Date;
  onChange: (date: Date) => void;
};
export const DateInput = ({ title, value, onChange }: DateInputProps) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [date, setDate] = useState<Date | null>(value);
  const [isShowingDatePicker, setIsShowingDatePicker] = useState(false);

  const handleButtonPress = () => {
    if (!isShowingDatePicker && !date) setDate(new Date());

    setIsShowingDatePicker(!isShowingDatePicker);
  };

  return (
    <>
      {isShowingDatePicker && (
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={[340]}
          backgroundStyle={tw`bg-base-300`}
          handleIndicatorStyle={tw`bg-primary-base`}
        >
          <BottomSheetView>
            <View style={tw`flex-1`}>
              <DateTimePicker
                value={date ?? new Date()}
                mode="date"
                display="inline"
                accentColor={tw.color("primary-base")}
                onChange={(_event: DateTimePickerEvent, newDate) => {
                  if (isSameMonth(newDate, date) && isSameYear(newDate, date)) {
                    setIsShowingDatePicker(false);
                  }
                  setDate(newDate);
                  onChange(newDate);
                }}
              />
            </View>
          </BottomSheetView>
        </BottomSheet>
      )}
      <Button
        style={tw.style(isShowingDatePicker && `border-primary-base`)}
        title={date ? format(date, "EEE, d LLL") : title}
        icon={date ? "calendar" : "calendar-plus"}
        onPress={handleButtonPress}
      />
    </>
  );
};
