import { TextInput, View } from "react-native";
import { Checkbox } from "src/components/Checkbox";
import { tw } from "src/theme";

type TaskDetailHeaderProps = {
  title: string;
  completed: boolean;
  onChangeTitle: (title: string) => void;
  onToggleCompletion: () => void;
  onSubmitTitle: () => void;
};
export const TaskDetailHeader = ({
  title,
  completed,
  onChangeTitle,
  onToggleCompletion,
  onSubmitTitle,
}: TaskDetailHeaderProps) => {
  return (
    <View style={tw`flex-row items-center px-6 py-3`}>
      <Checkbox size="lg" isChecked={completed} onToggle={onToggleCompletion} />
      <TextInput
        style={tw`text-base-content text-base text-3xl font-semibold ml-6`}
        value={title}
        onChangeText={onChangeTitle}
        onEndEditing={onSubmitTitle}
      />
    </View>
  );
};
