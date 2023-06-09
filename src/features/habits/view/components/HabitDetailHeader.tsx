import { observer } from "mobx-react";
import { View, TextInput } from "react-native";
import { tw } from "src/theme";

type HabitDetailHeaderProps = {
  title: string;
  onChangeTitle: (title: string) => void;
  onSubmitTitle: () => void;
};
export const HabitDetailHeader = observer(
  ({ title, onChangeTitle, onSubmitTitle }: HabitDetailHeaderProps) => {
    return (
      <View style={tw`flex-row justify-between items-center px-4 py-3`}>
        <TextInput
          style={tw`text-2xl font-bold text-base-content`}
          value={title}
          onChangeText={onChangeTitle}
          onEndEditing={onSubmitTitle}
        />
      </View>
    );
  }
);
