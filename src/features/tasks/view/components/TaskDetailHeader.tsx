import { TextInput, View } from 'react-native';
import { Checkbox } from '../../../../components/Checkbox';

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
    <View className="flex-row items-center px-5 py-3">
      <Checkbox size="lg" isChecked={completed} onToggle={onToggleCompletion} />
      <TextInput
        className="text-base-content text-3xl font-semibold ml-3"
        value={title}
        onChangeText={onChangeTitle}
        onEndEditing={onSubmitTitle}
      />
    </View>
  );
};
