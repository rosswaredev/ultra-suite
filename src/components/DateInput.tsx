import React, { useState } from "react";
import { Modal, View } from "react-native";
import { Button } from "./Button";
import { tw } from "../theme";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { BlurView } from "expo-blur";
import { format, isSameMonth } from "date-fns";
import { isSameYear } from "date-fns";

type DateInputProps = {
  title: string;
  value: Date;
  onChange: (date: Date) => void;
};
export const DateInput = ({ title, value, onChange }: DateInputProps) => {
  const [date, setDate] = useState<Date | null>(null);
  const [isShowingDatePicker, setIsShowingDatePicker] = useState(false);

  const handleButtonPress = () => {
    if (!isShowingDatePicker && !date) setDate(new Date());

    setIsShowingDatePicker(!isShowingDatePicker);
  };

  return (
    <>
      <Modal visible={isShowingDatePicker} animationType="fade" transparent>
        <View style={tw`absolute h-2/4 w-full bottom-8 px-4`}>
          <View
            style={tw`border border-primary-base rounded-lg overflow-hidden`}
          >
            <BlurView intensity={100} tint="dark" style={tw`rounded-lg`}>
              <DateTimePicker
                value={date}
                mode="date"
                display="inline"
                accentColor={tw.color("primary-base")}
                onChange={(_event: DateTimePickerEvent, newDate) => {
                  if (isSameMonth(newDate, date) && isSameYear(newDate, date)) {
                    setIsShowingDatePicker(false);
                  }
                  setDate(newDate);
                }}
              />
            </BlurView>
          </View>
        </View>
      </Modal>
      <Button
        style={tw.style(isShowingDatePicker && `border-primary-base`)}
        title={date ? format(date, "EEE, d LLL") : title}
        icon={date ? "calendar" : "calendar-plus"}
        onPress={handleButtonPress}
      />
    </>
  );
};
