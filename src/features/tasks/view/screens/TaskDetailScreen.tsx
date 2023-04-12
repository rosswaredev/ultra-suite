import { Stack, useRouter } from "expo-router";
import { observer } from "mobx-react";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { Button } from "src/components/Button";
import { useParam } from "src/hooks/useParam";
import { tw } from "src/theme";
import { TaskDetailHeader } from "../components/TaskDetailHeader";
import { useTaskDetailPresenter } from "../hooks/useTaskDetailPresenter";

export const TaskDetailScreen = observer(() => {
  const router = useRouter();
  const taskId = useParam("taskId");
  const task = useTaskDetailPresenter(taskId);
  const [taskTitle, setTaskTitle] = useState(task.title);

  const handleChangeTitle = (title: string) => setTaskTitle(title);
  const handleSubmitTitle = () => task.updateTitle(taskTitle);
  const handleDelete = () => {
    task.removeTask();
    router.back();
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Stack.Screen options={{ headerLargeTitle: false, title: "" }} />
      <TaskDetailHeader
        title={taskTitle}
        completed={task.completed}
        onToggleCompletion={task.toggleCompletion}
        onChangeTitle={handleChangeTitle}
        onSubmitTitle={handleSubmitTitle}
      />
      <View style={tw`px-3`}>
        <Button
          variant="error"
          icon="delete"
          title="Delete Task"
          onPress={handleDelete}
        />
      </View>
    </ScrollView>
  );
});
