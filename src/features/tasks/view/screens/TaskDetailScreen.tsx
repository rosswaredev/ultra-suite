import { Stack, useRouter } from "expo-router";
import { observer } from "mobx-react";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { Button } from "src/components/Button";
import { useParam } from "src/hooks/useParam";
import { tw } from "src/theme";
import { TaskDetailHeader } from "../components/TaskDetailHeader";
import { useTaskDetailPresenter } from "../hooks/useTaskDetailPresenter";
import { DateInputSheet, Space } from "src/components";
import { InputRow } from "src/components/InputRow";
import { format } from "date-fns";

export const TaskDetailScreen = observer(() => {
  const router = useRouter();
  const taskId = useParam("taskId");
  const task = useTaskDetailPresenter(taskId);
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [isShowingDateInputSheet, setIsShowingDateInputSheet] = useState(false);

  const dueDateInputRowIcon = task.dueDate ? "calendar" : "calendar-plus";
  const dueDateInputRowTitle = task.dueDate
    ? `Due ${format(task.dueDate, "EEE, d MMM")}`
    : "Add Due Date";

  const handleChangeTitle = (title: string) => setTaskTitle(title);
  const handleSubmitTitle = () => task.updateTitle(taskTitle);
  const handleDelete = () => {
    task.removeTask();
    router.back();
  };
  const handleUpdateDueDate = (date: Date) => {
    setIsShowingDateInputSheet(false);
    task.updateDueDate(date);
  };
  const handleClearDueDate = () => task.clearDueDate();
  const handleDueDateInput = () => {
    setIsShowingDateInputSheet(!isShowingDateInputSheet);
  };

  return (
    <>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={tw`flex-1`}
      >
        <Stack.Screen options={{ headerLargeTitle: false, title: "" }} />
        <TaskDetailHeader
          title={taskTitle}
          completed={task.completed}
          onToggleCompletion={task.toggleCompletion}
          onChangeTitle={handleChangeTitle}
          onSubmitTitle={handleSubmitTitle}
        />
        <InputRow
          icon={dueDateInputRowIcon}
          title={dueDateInputRowTitle}
          isSelected={!!task.dueDate}
          onPress={handleDueDateInput}
          onClear={handleClearDueDate}
        />
        <View style={tw`px-3 flex-1`}>
          <Space />
          <Button
            textStyle={tw`text-error-base`}
            variant="ghost"
            icon="delete"
            iconColor="error-base"
            title="Delete Task"
            onPress={handleDelete}
          />
        </View>
      </ScrollView>
      <DateInputSheet
        value={task.dueDate}
        onChange={handleUpdateDueDate}
        isOpen={isShowingDateInputSheet}
      />
    </>
  );
});
